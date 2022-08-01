import StorageKeys from "constant/storage-keys";

const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    showMiniCart: false,
    cartItems: JSON.parse(localStorage.getItem(StorageKeys.CART)) || [],
  },
  reducers: {
    toggleMiniCart: (state) => {
      state.showMiniCart = !state.showMiniCart;
    },

    addToCart: (state, action) => {
      const newItem = action.payload;
      const index = state.cartItems.findIndex(
        (item) => item.productDetailId === newItem.productDetailId
      );
      if (index >= 0) {
        // increase quantity
        state.cartItems[index].quantity += newItem.quantity;
      } else {
        // add to cart
        state.cartItems.push(newItem);
      }
      localStorage.setItem(StorageKeys.CART, JSON.stringify(state.cartItems));
    },
    setQuantity: (state, action) => {
      const { productDetailId, quantity } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.productDetailId === productDetailId
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity = quantity;
      }
      localStorage.setItem(StorageKeys.CART, JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const idNeedToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.productDetailId !== idNeedToRemove
      );
      localStorage.setItem(StorageKeys.CART, JSON.stringify(state.cartItems));
    },

    resetCart: (state, action) => {
      state.cartItems = [];
      localStorage.setItem(StorageKeys.CART, JSON.stringify(state.cartItems));
    },
  },
});

const { actions, reducer } = cartSlice;
export const {
  toggleMiniCart,
  addToCart,
  setQuantity,
  removeFromCart,
  resetCart,
} = actions;
export default reducer;
