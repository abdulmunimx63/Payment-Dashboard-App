import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "../../types/types";

const initialState: AuthResponse = {
  access_token: "",
  expires_in: 0,
  token_type: "",
  refresh_token: "",
  scope: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthResponse>) => {
      state.access_token = action.payload.access_token;
      state.expires_in = action.payload.expires_in;
      state.refresh_token = action.payload.refresh_token;
      state.token_type = action.payload.token_type;
      state.scope = action.payload.scope;
    },

    logout: () => initialState,
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
