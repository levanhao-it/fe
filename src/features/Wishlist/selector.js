import { createSelector } from "@reduxjs/toolkit";

const wishListSelector = (state) => state.wishList.current;

// count the total number of items in the cart
export const wishlistCountSelector = createSelector(
  wishListSelector,
  (wishList) => wishList.length
);
