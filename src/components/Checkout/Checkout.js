import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../../store/cart";

import CartSummary from "../CartSummary/CartSummary";
import AddressManager from "../Address/AddressManager";
import CartProductListing from "../Cart/CartProductListing/CartProductListing";
import Modal from "../UI/Modal/Modal";
import { displayRazorpay } from "./razorpay";
import { placeOrder } from "../../services/cart.service";

import "./checkout.css";
import { showToast } from "../../utils/helper";

export default function Checkout() {
  const [selectedAddress, setSelectedAddress] = useState();
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { cart, cartDispatch, cartActionTypes } = useCart();

  const navigate = useNavigate();

  const selectAddressHandler = (address) => {
    setSelectedAddress(address);
  };

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
    });
  }, []);

  const submitOrder = () => {
    try {
      if (!selectedAddress) return;
      setIsProcessing(true);
      displayRazorpay(paymentSuccessCallback);
    } catch (e) {
      showToast(<p>Ops, Something went wrong. Please try again later</p>);
      setIsProcessing(false);
    }
  };

  const paymentSuccessCallback = async () => {
    const response = await placeOrder();
    if (response.success) {
      cartDispatch({
        type: cartActionTypes.EMPTY_CART,
      });
      setShowOrderConfirmation(true);
    }
    setIsProcessing(false);
  };

  const navigateToHome = () => {
    setShowOrderConfirmation(false);
    navigate("/");
  };

  return (
    <div className="cart-container">
      <div className="cart-products" style={{ boxShadow: "none" }}>
        <AddressManager
          selectAddressHandler={selectAddressHandler}
          selectedAddress={selectedAddress}
        />
        <div style={{ width: "80%", margin: "auto" }}>
          <CartProductListing cartLines={cart.cartLines} readOnly={true} />
        </div>
        <button
          className="btn checkout-btn desktop-only"
          disabled={
            !selectedAddress || cart.cartLines.length === 0 || isProcessing
          }
          onClick={submitOrder}
        >
          {isProcessing ? "Processing order" : "Proceed To Pay"}
        </button>
      </div>

      <div className="cart-summary">
        <CartSummary />
        <button
          className="btn checkout-btn"
          disabled={
            !selectedAddress || cart.cartLines.length === 0 || isProcessing
          }
          onClick={submitOrder}
        >
          {isProcessing ? "Processing order" : "Proceed To Pay"}
        </button>
      </div>

      {showOrderConfirmation && (
        <Modal closeModal={() => {}} isOpen={showOrderConfirmation}>
          <div className="order-confirmation">
            <h3>Order Confirmation</h3>
            Your Order has been successfully placed!
            <button className="btn checkout-btn" onClick={navigateToHome}>
              Continue Shopping
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
