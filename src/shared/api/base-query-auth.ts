import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
} from "@reduxjs/toolkit/query";

import { apiConfig } from "@/shared/config/api";
import { tokenStorage } from "@/shared/lib/token-storage";

const rawAuthorizedQuery = fetchBaseQuery({
  baseUrl: apiConfig.baseUrl,
  credentials: "include",
  prepareHeaders: (headers) => {
    const t = tokenStorage.getAccessToken();
    if (t) headers.set("Authorization", `Bearer ${t}`);
    return headers;
  },
});

let refreshFlight: Promise<boolean> | null = null;

function getRequestPath(args: string | FetchArgs): string {
  const url = typeof args === "string" ? args : args.url;
  const path = url.startsWith("/") ? url : `/${url}`;
  return path.split("?")[0] ?? "/";
}

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = tokenStorage.getRefreshToken();
  if (!refreshToken) return false;

  const base = apiConfig.baseUrl.replace(/\/$/, "");
  const refreshUrl = `${base}/refresh`;

  const res = await fetch(refreshUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      Accept: "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    return false;
  }

  const parsed = (await res.json()) as {
    accessToken: string;
    refreshToken: string;
  };

  tokenStorage.setTokens(parsed.accessToken, parsed.refreshToken);
  return true;
}

function shouldSkipReauthRetry(args: string | FetchArgs): boolean {
  const pathname = getRequestPath(args);
  return (
    pathname.endsWith("/login") ||
    pathname.endsWith("/register") ||
    pathname.endsWith("/refresh") ||
    pathname.endsWith("/check")
  );
}

async function guardedRefresh(): Promise<boolean> {
  if (!refreshFlight) {
    refreshFlight = refreshAccessToken().finally(() => {
      refreshFlight = null;
    });
  }
  return refreshFlight;
}

export const baseQueryWithAuth: BaseQueryFn = async (
  args,
  api,
  extraOptions,
) => {
  const extras = extraOptions ?? {};
  const result = await rawAuthorizedQuery(args, api, extras);

  if (result.error?.status !== 401 || shouldSkipReauthRetry(args)) {
    return result;
  }

  const refreshed = await guardedRefresh();
  if (!refreshed) {
    tokenStorage.clear();
    return result;
  }

  return rawAuthorizedQuery(args, api, extras);
};
