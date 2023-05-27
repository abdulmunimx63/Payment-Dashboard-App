import { createApi } from "@reduxjs/toolkit/query/react";
import { authFetchBaseQuery } from "../authFetchBaseQuery";
import { API_GET_DEALER_TRANSACTIONS } from "../ApiConstants";
import {
  IGetDealerTransactionsRequest,
  IGetDealerTransactionsResponse,
} from "../../types/types";

const baseUrl = process.env.REACT_APP_BASE_URL || "";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: authFetchBaseQuery(baseUrl),

  endpoints: (builder) => ({
    getDealerTransactions: builder.query<
      IGetDealerTransactionsResponse,
      IGetDealerTransactionsRequest
    >({
      query: ({ dealerId, page, rowsPerPage, customerName, cardNumber }) =>
        `${API_GET_DEALER_TRANSACTIONS}?dealerId=${dealerId}&Page=${
          page === 0 ? 1 : page
        }&PageSize=${rowsPerPage}&customerName=${customerName}&cardNumber=${cardNumber}`,
    }),
  }),
});

export const { useGetDealerTransactionsQuery } = transactionApi;
