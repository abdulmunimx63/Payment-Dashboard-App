import { createApi } from "@reduxjs/toolkit/query/react";
import { authFetchBaseQuery } from "../authFetchBaseQuery";
import { IDashboardRequest, IDashboardResponse } from "../../types/types";
import { API_GET_DASHBOARD_DATA } from "../ApiConstants";

const baseUrl = process.env.REACT_APP_BASE_URL || "";

export const dashboardApi = createApi({
  reducerPath: "dashboardAppApi",
  baseQuery: authFetchBaseQuery(baseUrl),

  endpoints: (builder) => ({
    getDashboardData: builder.query<IDashboardResponse, IDashboardRequest>({
      query: ({
        dealerId,
        isRemotePayments,
        fromDate,
        toDate,
        transactionType,
      }) =>
        `${API_GET_DASHBOARD_DATA}?dealerId=${dealerId}&fromDate=${fromDate}&toDate=${toDate}&isRemotePayments=${isRemotePayments}&transactionType=${transactionType}`,
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;
