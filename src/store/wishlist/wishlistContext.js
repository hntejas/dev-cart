import { createContext, useReducer } from "react";
import { wishlistReducer } from "./wishlistReducer";
import * as wishlistActionTypes from "./wishlistActionType";

export const WishlistContext = createContext();

const initialWishlistState = [
  // {
  //   availability: "IN_STOCK",
  //   basePrice: 88990,
  //   brand: "Lenovo",
  //   category: "Laptops",
  //   createdAt: "2021-05-09T07:01:40.100Z",
  //   imgUrl:
  //     "https://res.cloudinary.com/hntejas/image/upload/v1620456567/dev-cart/lenovo-legion-5.jpg",
  //   price: 66990,
  //   rating: 4.5,
  //   title: "Lenovo Legion 5",
  //   updatedAt: "2021-05-09T07:01:40.100Z",
  //   __v: 0,
  //   id: "609788d49632cf00237769ad",
  // },
];

export function WishlistContextProvider({ children }) {
  const [wishlist, wishlistDispatch] = useReducer(
    wishlistReducer,
    initialWishlistState
  );
  return (
    <WishlistContext.Provider
      value={{ wishlist, wishlistDispatch, wishlistActionTypes }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
