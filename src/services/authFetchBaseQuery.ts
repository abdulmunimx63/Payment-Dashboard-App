import { RootState } from "../app/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authFetchBaseQuery = (baseUrl: string) => {
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Add the authorization token to the headers
      const accessToken = (getState() as RootState).auth.access_token;
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  });
};
