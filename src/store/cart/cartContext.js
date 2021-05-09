import { createContext, useReducer } from "react";

import { cartReducer } from "./cartReducer";

export const CartContext = createContext();

const initialCartState = {
  cartLines: [
    {
      product: {
        availability: "IN_STOCK",
        basePrice: 5499,
        brand: "Skullcandy",
        category: "Headphones",
        createdAt: "2021-05-09T07:01:40.096Z",
        id: "609788d49632cf00237769a5",
        imgUrl:
          "https://res.cloudinary.com/hntejas/image/upload/v1620465030/dev-cart/skullcandy-headphone.jpg",
        price: 2825,
        rating: 4.3,
        title: "Skullcandy Uproar Bluetooth Headset",
        updatedAt: "2021-05-09T07:01:40.096Z",
        __v: 0,
        _id: undefined,
      },
      quantity: 1,
      amount: 2825,
      totalBaseAmount: 5499,
    },
  ],
  cartQuantity: 1,
  total: 1799,
  totalBasePrice: 1999,
};

export function CartContextProvider({ children }) {
  const [cart, cartDispatch] = useReducer(cartReducer, initialCartState);
  return (
    <CartContext.Provider value={{ cart, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
}
