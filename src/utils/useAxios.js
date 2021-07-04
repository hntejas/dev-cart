import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../store/user";

const useAxios = async (axiosRequest) => {
  try {
    const response = await axiosRequest;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error;
      if (serverError && serverError.response) {
        return {
          ...serverError.response.data,
          status: serverError.response.status,
        };
      }
    }
    return {
      success: false,
      error: {
        message: "Something went wrong! Please try again",
      },
    };
  }
};

const loaderMessage = {
  cart: {
    get: "Loading Cart...",
    put: "Updating Item...",
    post: "Adding...",
    delete: "Removing...",
  },
  wishlist: {
    get: "Loading Wishlist...",
    post: "Adding...",
    delete: "Removing...",
  },
  login: {
    post: "Logging In...",
  },
  signup: {
    post: "Signing Up..",
  },
  address: {
    post: "Adding address...",
    put: "Updating address...",
    get: "Loading address...",
  },
  order: {
    post: "Placing your order...",
  },
};

export const axiosInterceptor = () => {
  const [loading, setLoading] = useState(false);
  const [loaderText, setLoaderText] = useState("Loading...");
  const { userDispatch, userActionTypes } = useUser();
  const navigator = useNavigate();

  axios.interceptors.request.use(
    (config) => {
      const path = config.url.substring(config.url.lastIndexOf("/") + 1);
      setLoaderText(loaderMessage[path] && loaderMessage[path][config.method]);
      setLoading(true);
      return config;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error) => {
      if (error && error.response && error.response.status === 401) {
        userDispatch({
          type: userActionTypes.UPDATE_USER_LOGIN,
          payload: {
            isLoggedIn: false,
          },
        });
      }
      setLoading(false);
      return Promise.reject(error);
    }
  );

  return { loading, loaderText };
};

export default useAxios;
