import { Link } from "react-router-dom";

import { useCart } from "../../store/cart";
import CartProductListing from "./CartProductListing/CartProductListing";
import CartSummary from "../CartSummary/CartSummary";
import EmptyCartImg from "../../assets/empty_cart.svg";

import "./cart.css";

export default function Cart() {
  const { cart } = useCart();

  return (
    <div className="cart-container">
      {cart.cartLines.length === 0 ? (
        <div className="empty-page-container">
          <img loading="lazy" src={EmptyCartImg} className="empty-img" />
          <h2>Cart is Empty</h2>
          <Link to="/shop" className={"btn checkout-btn "}>
            Shop Now
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-products">
            <CartProductListing cartLines={cart.cartLines} />
          </div>
          <div className="cart-summary">
            <CartSummary />
            <Link
              to="/checkout"
              className={
                "btn checkout-btn " +
                (cart.cartLines.length === 0 ? "link-disabled" : "")
              }
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
