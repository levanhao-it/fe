import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import wishListApi from "api/wishListApi";
import StorageKeys from "constant/storage-keys";

export const getWishList = createAsyncThunk("wishList/get", async (payload) => {
  const { data } = await wishListApi.getAll(payload);

  return data;
});

export const addWishList = createAsyncThunk(
  "wishList/created",
  async (payload) => {
    const { data } = await wishListApi.add(payload);

    return data;
  }
);

export const removeWishList = createAsyncThunk(
  "wishList/deleted",
  async (payload) => {
    // call API to register user
    const email = payload.email;
    const { data } = await wishListApi.remove(payload.id, { email });
    //return user data
    return data;
  }
);

const userSlice = createSlice({
  name: "wishList",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.WISHLIST)) || [],
    settings: {},
  },
  reducers: {
    reset(state, action) {
      localStorage.removeItem(StorageKeys.WISHLIST);
      return { ...state, current: [] };
    },
  },
  extraReducers: {
    [getWishList.fulfilled]: (state, action) => {
      state.current = action.payload;
      localStorage.setItem(StorageKeys.WISHLIST, JSON.stringify(state.current));
    },

    [addWishList.fulfilled]: (state, action) => {
      state.current = action.payload;
      localStorage.setItem(StorageKeys.WISHLIST, JSON.stringify(state.current));
    },

    [removeWishList.fulfilled]: (state, action) => {
      state.current = action.payload;
      localStorage.setItem(StorageKeys.WISHLIST, JSON.stringify(state.current));
    },
  },
});
const { actions, reducer } = userSlice;

export const { reset } = actions;
export default reducer;
