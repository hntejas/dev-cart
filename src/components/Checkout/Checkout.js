import CartSummary from "../CartSummary/CartSummary";
import AddressForm from "../Address/AddressForm";
import PaymentCardForm from "../Payment/PaymentCardForm";

export default function Checkout() {
  return (
    <div className="cart-container">
      <div className="cart-products">
        <AddressForm />
        <PaymentCardForm />
      </div>

      <div className="cart-summary">
        <CartSummary />
      </div>
    </div>
  );
}
