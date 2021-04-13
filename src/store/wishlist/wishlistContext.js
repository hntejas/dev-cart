import { createContext, useReducer } from "react";
import { wishlistReducer } from "./wishlistReducer";

export const WishlistContext = createContext();

const initialWishlistState = [
  {
    id: 3,
    imgUrl:
      "https://rukminim1.flixcart.com/image/580/696/kg2l47k0-0/sandal/g/t/f/205089-0a3-crocs-charcoal-volt-green-original-imafwe5hb8gmhfxu.jpeg?q=50",
    title: "Product Title 3",
    brand: "Brand 3",
    category: "Furniture",
    availability: "IN_STOCK",
    price: 999,
    basePrice: 2200,
    rating: 4,
  },
  {
    id: 4,
    imgUrl:
      "https://rukminim1.flixcart.com/image/580/696/kg2l47k0-0/sandal/g/t/f/205089-0a3-crocs-charcoal-volt-green-original-imafwe5hb8gmhfxu.jpeg?q=50",
    title: "Product Title 4",
    brand: "Brand 1",
    category: "Monitors",
    availability: "OUT_OF_STOCK",
    price: 10000,
    basePrice: 12000,
    rating: 4,
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
