import { combineReducers } from "redux";

import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/auth/authSlice";
import dealerReducer from "../features/dealer/dealerSlice";

import { authApi } from "../services/API/authApiSlice";
import { dashboardApi } from "../services/API/dashboardApiSlice";
import { transactionApi } from "../services/API/transactionsApiSlice";
import { userApi } from "../services/API/userApiSlice";
import { vaultedCardApi } from "../services/API/vaultedCardApiSlice";
import { settingsApi } from "../services/API/settingsApiSlice";

export default combineReducers({
  counter: counterReducer,
  auth: authReducer,
  dealer: dealerReducer,

  [authApi.reducerPath]: authApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [transactionApi.reducerPath]: transactionApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [vaultedCardApi.reducerPath]: vaultedCardApi.reducer,
  [settingsApi.reducerPath]: settingsApi.reducer,
});
