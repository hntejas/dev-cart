import { CartContext } from "../../store/cart/cartContext";
import { useContext } from "react";

import CartProductListing from "./CartProductListing/CartProductListing";
import CartSummary from "../CartSummary/CartSummary";

import "./cart.css";

export default function Cart() {
  const { cart } = useContext(CartContext);
  return (
    <div className="cart-container">
      <div className="cart-products">
        <CartProductListing cartLines={cart.cartLines} />
      </div>
      <div className="cart-summary">
        <CartSummary />
      </div>
    </div>
  );
}
