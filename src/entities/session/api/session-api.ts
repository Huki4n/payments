import { baseApi } from "@/shared/api";
import { tokenStorage } from "@/shared/lib/token-storage";

import type {
  JwtTokenPairDto,
  LoginRequest,
  RegisterRequest,
  UserExistsResponse,
} from "../model/types";

function saveTokensFromPair(data: JwtTokenPairDto): void {
  tokenStorage.setTokens(data.accessToken, data.refreshToken);
}

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    checkUserExists: build.query<UserExistsResponse, { phone: string }>({
      query: ({ phone }) => ({
        url: "/check",
        params: { phone },
      }),
    }),
    register: build.mutation<JwtTokenPairDto, RegisterRequest>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          saveTokensFromPair(data);
        } catch {
          /* токены только при успехе */
        }
      },
    }),
    login: build.mutation<JwtTokenPairDto, LoginRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          saveTokensFromPair(data);
        } catch {
          /* токены только при успехе */
        }
      },
    }),
    logout: build.mutation<void, void>({
      queryFn: async () => ({ data: undefined }),
      async onQueryStarted(_, { dispatch }) {
        tokenStorage.clear();
        dispatch(baseApi.util.resetApiState());
      },
    }),
  }),
});

export const {
  useLazyCheckUserExistsQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
} = sessionApi;
