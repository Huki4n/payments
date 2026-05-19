import { baseApi } from "@/shared/api";

import type { ManualRow } from "../model/types";

export type SubmitBankStatementsArg = {
  files: Array<{ name: string; size: number }>;
};

export const transactionsApiInjection = baseApi.injectEndpoints({
  endpoints: (build) => ({
    submitManualRows: build.mutation<{ ok: true }, { rows: ManualRow[] }>({
      query: ({ rows }) => ({
        url: "/imports/manual-rows",
        method: "POST",
        body: { rows },
      }),
      invalidatesTags: ["Import"],
    }),
    submitBankStatements: build.mutation<{ ok: true }, SubmitBankStatementsArg>(
      {
        query: (payload) => ({
          url: "/imports/bank-statements",
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ["Import"],
      },
    ),
  }),
});

export const { useSubmitManualRowsMutation, useSubmitBankStatementsMutation } =
  transactionsApiInjection;
