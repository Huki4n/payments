import { baseApi } from '@/shared/api'
import { GOAL_CURRENCIES } from '@/shared/config/currencies'
import { fetchExchangeRates } from '@/shared/lib/currency-exchange'

import type {
  BankStatementResponse,
  CreateTransactionRequest,
  GetTransactionsQueryArg,
  TransactionResponse,
} from '../model/types'

import { convertBankStatementToDisplayCurrency } from '../lib/convert-bank-statement'

export const transactionsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getTransactions: build.query<BankStatementResponse, GetTransactionsQueryArg>({
      async queryFn({ displayCurrency, params }, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: '/transactions',
          params: params ?? undefined,
        })

        if (result.error) {
          return { error: result.error }
        }

        const rates = await fetchExchangeRates({
          base: 'USD',
          targets: GOAL_CURRENCIES.filter(code => code !== 'USD'),
        })

        return {
          data: convertBankStatementToDisplayCurrency(
            result.data as BankStatementResponse,
            displayCurrency,
            rates
          ),
        }
      },
      providesTags: [{ type: 'Transaction', id: 'LIST' }],
    }),
    createTransaction: build.mutation<TransactionResponse, CreateTransactionRequest>({
      query: body => ({
        url: '/transactions',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Transaction', id: 'LIST' }],
    }),
    parseStatement: build.mutation<BankStatementResponse, File>({
      query: file => {
        const formData = new FormData()

        formData.append('file', file)

        return {
          url: '/transactions/parse',
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: [{ type: 'Transaction', id: 'LIST' }],
    }),
    createTransactions: build.mutation<TransactionResponse[], CreateTransactionRequest[]>({
      async queryFn(body, _api, _extraOptions, baseQuery) {
        if (body.length === 0) {
          return {
            error: {
              status: 400,
              data: { message: 'No transactions to submit' },
            },
          }
        }

        const created: TransactionResponse[] = []

        for (const item of body) {
          const result = await baseQuery({
            url: '/transactions',
            method: 'POST',
            body: item,
          })

          if (result.error) {
            return { error: result.error }
          }

          created.push(result.data as TransactionResponse)
        }

        return { data: created }
      },
      invalidatesTags: [{ type: 'Transaction', id: 'LIST' }],
    }),
    parseStatements: build.mutation<BankStatementResponse, File[]>({
      async queryFn(files, _api, _extraOptions, baseQuery) {
        if (files.length === 0) {
          return {
            error: {
              status: 400,
              data: { message: 'No files to upload' },
            },
          }
        }

        let lastStatement: BankStatementResponse | undefined

        for (const file of files) {
          const formData = new FormData()

          formData.append('file', file)

          const result = await baseQuery({
            url: '/transactions/parse',
            method: 'POST',
            body: formData,
          })

          if (result.error) {
            return { error: result.error }
          }

          lastStatement = result.data as BankStatementResponse
        }

        return { data: lastStatement! }
      },
      invalidatesTags: [{ type: 'Transaction', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetTransactionsQuery,
  useLazyGetTransactionsQuery,
  useCreateTransactionMutation,
  useCreateTransactionsMutation,
  useParseStatementMutation,
  useParseStatementsMutation,
} = transactionsApi
