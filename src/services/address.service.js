import axios from "axios";
import { getAuthToken } from "../utils/helper";
import useAxios from "../utils/useAxios";

export async function getAddresses() {
  const authToken = getAuthToken();
  return useAxios(
    axios.get("https://dev-cart.hntejas.repl.co/address", {
      headers: {
        Authorization: authToken,
      },
    })
  );
}

export async function addAddress(address) {
  const authToken = getAuthToken();
  return useAxios(
    axios.post(
      "https://dev-cart.hntejas.repl.co/address",
      { address },
      {
        headers: {
          Authorization: authToken,
        },
      }
    )
  );
}

export async function editAddress(address) {
  const authToken = getAuthToken();
  return await useAxios(
    axios.put(
      "https://dev-cart.hntejas.repl.co/address",
      { address },
      {
        headers: {
          Authorization: authToken,
        },
      }
    )
  );
}

export async function removeAddress(addressId) {
  const authToken = getAuthToken();
  return useAxios(
    axios.delete("https://dev-cart.hntejas.repl.co/address/" + addressId, {
      headers: {
        Authorization: authToken,
      },
    })
  );
}
