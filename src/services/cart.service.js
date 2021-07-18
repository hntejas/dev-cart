import axios from "axios";
import { getAuthToken } from "../utils/helper";
import useAxios from "../utils/useAxios";

export async function getUserCart() {
  try {
    const authToken = getAuthToken();
    return useAxios(
      axios.get("https://dev-cart.hntejas.repl.co/cart", {
        headers: {
          Authorization: authToken,
        },
      })
    );
  } catch (e) {
    console.log(error);
  }
}

export async function getPaymentOrder() {
  try {
    const authToken = getAuthToken();
    return useAxios(
      axios.get("https://dev-cart.hntejas.repl.co/order/paymentinit", {
        headers: {
          Authorization: authToken,
        },
      })
    );
  } catch (e) {
    console.log(error);
  }
}

export async function addItemToCart(itemId) {
  const authToken = getAuthToken();
  return useAxios(
    axios.post(
      "https://dev-cart.hntejas.repl.co/cart",
      { itemId },
      {
        headers: {
          Authorization: authToken,
        },
      }
    )
  );
}

export async function updateItemQuantity(cartId, quantity) {
  const authToken = getAuthToken();
  return await useAxios(
    axios.put(
      "https://dev-cart.hntejas.repl.co/cart",
      { cartId, quantity },
      {
        headers: {
          Authorization: authToken,
        },
      }
    )
  );
}

export async function removeItemFromCart(cartId) {
  const authToken = getAuthToken();
  return useAxios(
    axios.delete("https://dev-cart.hntejas.repl.co/cart/" + cartId, {
      headers: {
        Authorization: authToken,
      },
    })
  );
}

export async function placeOrder() {
  const authToken = getAuthToken();
  return useAxios(
    axios.post(
      "https://dev-cart.hntejas.repl.co/order",
      {},
      {
        headers: {
          Authorization: authToken,
        },
      }
    )
  );
}
