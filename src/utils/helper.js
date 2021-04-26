import { toast } from "react-toastify";

export const formatPrice = (price) => {
  return "₹" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function showToast(text) {
  toast(text, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    type: toast.dark,
    style: { background: "#181818", minHeight: "2rem" },
  });
}
