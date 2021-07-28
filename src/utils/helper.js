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

export const isLoggedInLocally = () =>
  localStorage.getItem("devCartAuth") &&
  !!JSON.parse(localStorage.getItem("devCartAuth"))["isLoggedIn"];

export const getLocalLoginName = () =>
  localStorage.getItem("devCartAuth") &&
  !!JSON.parse(localStorage.getItem("devCartAuth"))["isLoggedIn"]
    ? JSON.parse(localStorage.getItem("devCartAuth"))["name"]
    : "";

export const getAuthToken = () =>
  localStorage.getItem("devCartAuth") &&
  JSON.parse(localStorage.getItem("devCartAuth"))["token"];
