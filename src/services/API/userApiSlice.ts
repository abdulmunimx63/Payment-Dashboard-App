import { createApi } from "@reduxjs/toolkit/query/react";
import { authFetchBaseQuery } from "../authFetchBaseQuery";
import { API_GET_USERS } from "../ApiConstants";
import { UserResponse } from "../../types/types";

const baseUrl = process.env.REACT_APP_BASE_URL || "";

export const userApi = createApi({
  reducerPath: "UserApi",
  baseQuery: authFetchBaseQuery(baseUrl),
  endpoints: (builder) => ({
    getUsersByDealer: builder.query<UserResponse, void>({
      query: () => ({
        url: `${API_GET_USERS}`,
      }),
    }),
  }),
});

export const { useGetUsersByDealerQuery } = userApi;
