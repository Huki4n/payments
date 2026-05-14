import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import type { ManualRow } from "../model/types";

const STUB_DELAY_MS = 2000;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export type SubmitBankStatementsArg = {
  files: Array<{ name: string; size: number }>;
};

export const addDataApi = createApi({
  reducerPath: "addDataApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    submitManualRows: build.mutation<{ ok: true }, { rows: ManualRow[] }>({
      async queryFn({ rows: _rows }) {
        await delay(STUB_DELAY_MS);
        return { data: { ok: true } };
      },
    }),
    submitBankStatements: build.mutation<{ ok: true }, SubmitBankStatementsArg>({
      async queryFn({ files: _files }) {
        await delay(STUB_DELAY_MS);
        return { data: { ok: true } };
      },
    }),
  }),
});

export const { useSubmitManualRowsMutation, useSubmitBankStatementsMutation } =
  addDataApi;
