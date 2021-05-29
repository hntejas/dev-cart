import * as wishlistActionTypes from "./wishlistActionType";

const syncWishlist = (wishlistState, { wishlist }) => {
  return [...wishlist.products];
};

const emptyWishlist = (wishlistState) => {
  return [];
};

const addToWishlist = (wishlist, { product }) => {
  return [...wishlist, product];
};

const removeFromWishlist = (wishlist, { product }) => {
  return wishlist.filter((currProduct) => currProduct.id !== product.id);
};

export const wishlistReducer = (wishlist, action) => {
  switch (action.type) {
    case wishlistActionTypes.SYNC_WISHLIST:
      return syncWishlist(wishlist, action.payload);
    case wishlistActionTypes.ADD_TO_WISHLIST:
      return addToWishlist(wishlist, action.payload);
    case wishlistActionTypes.REMOVE_FROM_WISHLIST:
      return removeFromWishlist(wishlist, action.payload);
    case wishlistActionTypes.EMPTY_WISHLIST:
      return emptyWishlist(wishlist);
    default:
      return wishlist;
  }
};
