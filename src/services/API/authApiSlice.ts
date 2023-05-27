import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthRequest, AuthResponse } from "../../types/types";

const API_LOGIN = process.env.REACT_APP_AUTH_URL || "";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthRequest>({
      query: (body) => ({
        url: API_LOGIN,
        method: "Post",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
