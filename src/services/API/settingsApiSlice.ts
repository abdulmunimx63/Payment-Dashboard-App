import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGetDealerSettingsResponse, ISettingsForm } from "../../types/types";
import { API_ADD_SETTINGS, API_GET_DEALER_SETTINGS } from "../ApiConstants";
import { authFetchBaseQuery } from "../authFetchBaseQuery";

const baseUrl = process.env.REACT_APP_BASE_URL || "";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  prepareHeaders: (headers) => {
    // Add the access token to the headers from localStorage
    const accessToken = localStorage.getItem("access_token");
    headers.set("Authorization", `Bearer ${accessToken}`);
    return headers;
  },
});

export const settingsApi = createApi({
  reducerPath: "settingsApi",
  baseQuery:
    localStorage.getItem("Login_Source")?.toString() === "DMS_IDEAL"
      ? baseQuery
      : authFetchBaseQuery(baseUrl),
  endpoints: (builder) => ({
    addSettings: builder.mutation<void, ISettingsForm>({
      query: (body) => ({
        url: API_ADD_SETTINGS,
        method: "POST",
        body,
      }),
    }),

    getDealerSettings: builder.query<IGetDealerSettingsResponse, string>({
      query: (id) => ({
        url: `${API_GET_DEALER_SETTINGS}/${id}`,
      }),
    }),
  }),
});

export const { useAddSettingsMutation, useGetDealerSettingsQuery } =
  settingsApi;
