import CartSummary from "../CartSummary/CartSummary";
import AddressManager from "../Address/AddressManager";
import PaymentCardForm from "../Payment/PaymentCardForm";
import { useEffect, useState } from "react";
import { useCart } from "../../store/cart";
import { placeOrder } from "../../services/cart.service";
import Modal from "../UI/Modal/Modal";
import { useNavigate } from "react-router";
import "./checkout.css";

export default function Checkout() {
  const initialPaymentState = {
    cardNumber: {
      isValid: false,
      value: "",
      isTouched: false,
      isRequired: true,
      regex: /^\d{16}$/,
      style: "",
    },
    cardName: {
      isValid: true,
      value: "",
      isTouched: false,
      isRequired: true,
      regex: /^[a-zA-Z0-9_#,&@!%$ .-]*$/,
      style: "",
    },
    expiry: {
      isValid: false,
      value: "",
      isTouched: false,
      isRequired: true,
      regex: /^[a-zA-Z0-9_.-]*$/,
      style: "",
    },
    cvv: {
      isValid: false,
      value: "",
      isTouched: false,
      isRequired: true,
      regex: /^\d{3}$/,
      style: "",
    },
  };

  const [selectedAddress, setSelectedAddress] = useState();
  const [payment, setPayment] = useState(initialPaymentState);
  const [isOrderEligible, setIsOrderEligible] = useState();
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const { cartDispatch, cartActionTypes } = useCart();
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

  useEffect(() => {
    const isPaymentEligible = validatePaymentForm();
    setIsOrderEligible(selectedAddress && isPaymentEligible);
  }, [selectedAddress, payment]);

  const submitOrder = async () => {
    const isPaymentEligible = validatePaymentForm();
    if (!selectedAddress || !isPaymentEligible) {
      return;
    } else {
      const response = await placeOrder();
      if (response.success) {
        cartDispatch({
          type: cartActionTypes.EMPTY_CART,
        });
        setShowOrderConfirmation(true);
      }
    }
  };

  const validatePaymentForm = () => {
    const paymentCopy = { ...payment };
    let isFormValid = true;
    for (let addressFeild in paymentCopy) {
      const input = paymentCopy[addressFeild];
      input.isValid = input.isRequired
        ? !!input.value && input.regex.test(input.value)
        : true;
      if (!input.isValid) {
        isFormValid = false;
        input.style = "invalid-input";
      }
    }
    return isFormValid;
  };

  const navigateToHome = () => {
    setShowOrderConfirmation(false);
    navigate("/");
  };

  return (
    <div className="cart-container">
      <div className="cart-products">
        <AddressManager
          selectAddressHandler={selectAddressHandler}
          selectedAddress={selectedAddress}
        />
        <PaymentCardForm payment={payment} setPayment={setPayment} />
        <button
          className="btn checkout-btn desktop-only"
          disabled={!isOrderEligible}
          onClick={submitOrder}
        >
          Place Order
        </button>
      </div>

      <div className="cart-summary">
        <CartSummary />
        <button
          className="btn checkout-btn"
          disabled={!isOrderEligible}
          onClick={submitOrder}
        >
          Place Order
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
