import { getPaymentOrder } from "../../services/cart.service";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function displayRazorpay(paymentSuccessCallback) {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const result = await getPaymentOrder();

  if (!result) {
    alert("Server error. Are you online?");
    return {
      success: false,
    };
  }

  const { amount, id, currency } = result.paymentOrder;

  const options = {
    key: "rzp_test_esCvFmoSISnqTd",
    amount: amount.toString(),
    currency: currency,
    name: "Dev Cart",
    description: "Test Transaction",
    order_id: id,
    handler: async function (response) {
      const data = {
        orderCreationId: id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
      };
      paymentSuccessCallback();
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
