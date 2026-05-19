import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import type { ApiErrorResponse } from "../model/types";

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    ("data" in error || "error" in error)
  );
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (!isFetchBaseQueryError(error)) return fallback;

  if (error.data && typeof error.data === "object") {
    const data = error.data as ApiErrorResponse;
    if (typeof data.message === "string" && data.message.length > 0) {
      return data.message;
    }
  }

  if ("error" in error && typeof error.error === "string") {
    return error.error;
  }

  return fallback;
}
