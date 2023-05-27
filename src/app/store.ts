import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import reducer from "./reducer";

import { transactionApi } from "../services/API/transactionsApiSlice";
import { authApi } from "../services/API/authApiSlice";
import { userApi } from "../services/API/userApiSlice";
import { vaultedCardApi } from "../services/API/vaultedCardApiSlice";
import { dashboardApi } from "../services/API/dashboardApiSlice";
import { settingsApi } from "../services/API/settingsApiSlice";

const persistConfig = {
  key: "root",
  // version: 1,
  storage,
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducer),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      // Add the middleware to the store to enable caching, polling, invalidation.
      authApi.middleware,
      dashboardApi.middleware,
      transactionApi.middleware,
      userApi.middleware,
      vaultedCardApi.middleware,
      settingsApi.middleware,
    ]),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
