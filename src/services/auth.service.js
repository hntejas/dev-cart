import axios from "axios";
import useAxios from "../utils/useAxios";

export async function signup({ email, password }) {
  try {
    return useAxios(
      axios.post("https://dev-cart.hntejas.repl.co/auth/signup", {
        email: email,
        password: password,
      })
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
  }
}

export async function login({ email, password }) {
  try {
    return useAxios(
      await axios.post("https://dev-cart.hntejas.repl.co/auth/login", {
        email: email,
        password: password,
      })
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
  }
}
