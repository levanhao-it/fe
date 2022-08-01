import { createSlice } from "@reduxjs/toolkit";

const voucherSlice = createSlice({
  name: "voucher",
  initialState: {},
  reducers: {
    apply(state, action) {
      return action.payload;
    },
  },
});

const { actions, reducer } = voucherSlice;
export const { apply } = actions;
export default reducer;
