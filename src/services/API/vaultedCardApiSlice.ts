import { createApi } from "@reduxjs/toolkit/query/react";
import { authFetchBaseQuery } from "../authFetchBaseQuery";
import { API_VAULTED_CARD } from "../ApiConstants";
import { VaultedCardsRequest, VaultedCardsResponse } from "../../types/types";

const baseUrl = process.env.REACT_APP_BASE_URL || "";

export const vaultedCardApi = createApi({
  reducerPath: "VaultedCardApi",
  baseQuery: authFetchBaseQuery(baseUrl),
  endpoints: (builder) => ({
    getVaultCard: builder.query<VaultedCardsResponse, VaultedCardsRequest>({
      query: (params) =>
        `${API_VAULTED_CARD}?dealerId=${params.dealerId}&customerId=${params.customerId}`,
    }),
  }),
});

export const { useGetVaultCardQuery } = vaultedCardApi;
