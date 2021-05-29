import { Link } from "react-router-dom";

import { useCart } from "../../store/cart";
import CartProductListing from "./CartProductListing/CartProductListing";
import CartSummary from "../CartSummary/CartSummary";

import "./cart.css";

export default function Cart() {
  const { cart } = useCart();

  return (
    <div className="cart-container">
      <div className="cart-products">
        <CartProductListing cartLines={cart.cartLines} />
      </div>
      <div className="cart-summary">
        <CartSummary />
        <Link to="/checkout" className="btn checkout-btn">
          Checkout
        </Link>
      </div>
    </div>
  );
}
