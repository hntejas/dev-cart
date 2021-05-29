import axios from "axios";
import { getAuthToken } from "../utils/helper";
import useAxios from "../utils/useAxios";

export async function getUserWishlist() {
  const authToken = getAuthToken();
  return useAxios(
    axios.get("https://dev-cart.hntejas.repl.co/wishlist", {
      headers: {
        Authorization: authToken,
      },
    })
  );
}

export async function addItemToWishlist(itemId) {
  const authToken = getAuthToken();
  return useAxios(
    axios.post(
      "https://dev-cart.hntejas.repl.co/wishlist",
      { itemId },
      {
        headers: {
          Authorization: authToken,
        },
      }
    )
  );
}

export async function removeItemFromWishlist(itemId) {
  const authToken = getAuthToken();
  return useAxios(
    axios.delete("https://dev-cart.hntejas.repl.co/wishlist/" + itemId, {
      headers: {
        Authorization: authToken,
      },
    })
  );
}
