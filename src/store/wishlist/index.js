import { useContext } from "react";
import { WishlistContext } from "./wishlistContext";

export const useWishlist = () => {
  return useContext(WishlistContext);
};
