import * as wishlistActionTypes from "../types/wishlistActionType";

const addToWishlist = (wishlist, { product }) => {
  return [...wishlist, product];
};
const removeFromWishlist = (wishlist, { product }) => {
  return wishlist.filter((currProduct) => currProduct.id !== product.id);
};

export const wishlistReducer = (wishlist, action) => {
  switch (action.type) {
    case wishlistActionTypes.ADD_TO_WISHLIST:
      return addToWishlist(wishlist, action.payload);
    case wishlistActionTypes.REMOVE_FROM_WISHLIST:
      return removeFromWishlist(wishlist, action.payload);
    default:
      return wishlist;
  }
};
