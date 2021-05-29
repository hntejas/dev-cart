import { useState } from "react";
import "./payment-card-form.css";

export default function PaymentCardForm() {
  const initialFormState = {
    cardNumber: {
      isValid: false,
      value: "",
      isTouched: false,
      isRequired: true,
      regex: /^[a-zA-Z0-9_#,&@!%$ .-]*$/,
      style: "",
    },
    cardName: {
      isValid: true,
      value: "",
      isTouched: false,
      isRequired: false,
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
  };

  const [payment, setPayment] = useState(initialFormState);

  const inputHandler = (e) => {
    const fieldId = e.target.id;
    setPayment((payment) => {
      const paymentCopy = { ...payment };
      paymentCopy[fieldId].isTouched = true;
      paymentCopy[fieldId].value = e.target.value;
      return paymentCopy;
    });
  };

  const validateField = (e) => {
    const fieldId = e.target.id;
    setPayment((payment) => {
      const paymentCopy = { ...payment };
      const input = paymentCopy[fieldId];
      input.isValid =
        input.isTouched && input.isRequired
          ? !!e.target.value && input.regex.test(e.target.value)
          : true;
      input.style = input.isValid ? "" : "invalid-input";
      return paymentCopy;
    });
  };

  const validateForm = () => {
    const paymentCopy = { ...payment };
    let isFormValid = true;
    for (let addressFeild in paymentCopy) {
      const input = paymentCopy[addressFeild];
      input.isValid = input.isRequired
        ? !!input.value && input.regex.test(input.value)
        : true;
      if (!input.isValid) {
        isFormValid = false;
      }
    }
    setPayment(paymentCopy);
  };

  return (
    <div className="address-form">
      <h3>Payment</h3>
      <input
        id="cardNumber"
        placeholder="Card Number"
        value={payment.cardNumber.value}
        onChange={inputHandler}
        onBlur={validateField}
        className={payment.cardNumber.style}
      />
      <input
        id="cardName"
        placeholder="Name on Card"
        value={payment.cardName.value}
        onChange={inputHandler}
        onBlur={validateField}
        className={payment.cardName.style}
      />
      <input
        id="expiry"
        placeholder="Expiry MM/YY"
        type={"month"}
        value={payment.expiry.value}
        onChange={inputHandler}
        onBlur={validateField}
        className={payment.expiry.style}
      />
    </div>
  );
}
