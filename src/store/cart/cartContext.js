import { createContext, useReducer } from "react";
import { cartReducer } from "./cartReducer";

export const CartContext = createContext();

const initialCartState = {
  cartLines: [
    {
      product: {
        id: 1,
        imgUrl:
          "https://rukminim1.flixcart.com/image/580/696/kg2l47k0-0/sandal/g/t/f/205089-0a3-crocs-charcoal-volt-green-original-imafwe5hb8gmhfxu.jpeg?q=50", //"https://via.placeholder.com/200",
        title: "Product Title 1",
        brand: "Brand 1",
        price: 1799,
        basePrice: 1999,
        rating: 3,
      },
      quantity: 1,
      amount: 1799,
      totalBaseAmount: 1999,
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
