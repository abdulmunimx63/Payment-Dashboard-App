import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DealerState {
  dealerId: string;
}

const initialState: DealerState = {
  dealerId: "",
};

const dealerSlice = createSlice({
  name: "dealer",
  initialState,
  reducers: {
    setDealerId: (state, action: PayloadAction<string>) => {
      state.dealerId = action.payload;
    },
  },
});

export const { setDealerId } = dealerSlice.actions;

export default dealerSlice.reducer;
