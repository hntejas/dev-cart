import { useContext } from "react";

import { CartContext } from "../../store/cart/cartContext";
import { formatPrice } from "../../utils/helper";
import "./cart-summary.css";

export default function CartSummary() {
  const { cart } = useContext(CartContext);

  return (
    <div className="cart-summary-container">
      <h3>Cart Summary</h3>
      <div className="cart-summary-details">
        <div className="cart-summary-item">
          <span>Price ({cart.cartQuantity} items) </span>
          <span>{formatPrice(cart.totalBasePrice)}</span>
        </div>
        <div className="cart-summary-item">
          <span>Discount </span>
          <span className="text-green">
            {" "}
            - {formatPrice(cart.totalBasePrice - cart.total)}
          </span>
        </div>
        <div className="cart-summary-item">
          <span>Delivery Charges </span>
          <span className="text-green"> FREE </span>
        </div>
        <hr />
        <div className="cart-summary-item">
          <span>
            <b>Total Amount</b>
          </span>
          <span>
            {" "}
            <b>{formatPrice(cart.total)}</b>{" "}
          </span>
        </div>
        <hr />
        {cart.totalBasePrice - cart.total > 0 && (
          <div className="cart-summary-item">
            <span className="text-green">
              You will save {formatPrice(cart.totalBasePrice - cart.total)} on
              this order
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
