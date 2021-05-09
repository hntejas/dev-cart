import { createContext, useReducer } from "react";
import { wishlistReducer } from "./wishlistReducer";

export const WishlistContext = createContext();

const initialWishlistState = [
  {
    id: "6083f98d337817053e38c9a4",
    imgUrl:
      "https://rukminim1.flixcart.com/image/580/696/kg2l47k0-0/sandal/g/t/f/205089-0a3-crocs-charcoal-volt-green-original-imafwe5hb8gmhfxu.jpeg?q=50", //"https://via.placeholder.com/200",
    title: "Product Title 1",
    brand: "Brand 1",
    price: 1799,
    basePrice: 1999,
    rating: 3,
  },
];

export function WishlistContextProvider({ children }) {
  const [wishlist, wishlistDispatch] = useReducer(
    wishlistReducer,
    initialWishlistState
  );
  return (
    <WishlistContext.Provider
      value={{ wishlist, wishlistDispatch: wishlistDispatch }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
