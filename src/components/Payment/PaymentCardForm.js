import "./payment-card-form.css";

export default function PaymentCardForm({ payment, setPayment }) {
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

  return (
    <div className="payment-form">
      <h3>Card Details</h3>
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
      <div className="inline-inputs">
        <input
          id="expiry"
          placeholder="Expiry MM/YY"
          type={"month"}
          value={payment.expiry.value}
          onChange={inputHandler}
          onBlur={validateField}
          className={payment.expiry.style}
          style={{ width: "70%", marginRight: "5px" }}
        />
        <input
          id="cvv"
          placeholder="CVV"
          type="text"
          value={payment.cvv.value}
          onChange={inputHandler}
          onBlur={validateField}
          className={payment.cvv.style}
          style={{ width: "30%" }}
        />
      </div>
    </div>
  );
}
