import { createContext, useEffect, useReducer } from "react";
import userReducer from "./userReducer";
import * as userActionTypes from "./userActionType";

import { useCart } from "../cart";
import { getUserCart } from "../../services/cart.service";
import { useWishlist } from "../wishlist";
import { getUserWishlist } from "../../services/wishlist.service";
import { getAddresses } from "../../services/address.service";

import { isLoggedInLocally } from "../../utils/helper";

export const UserContext = createContext();

const syncCart = async (cartDispatch, cartActionTypes) => {
  const response = await getUserCart();
  if (response.success) {
    cartDispatch({
      type: cartActionTypes.SYNC_CART,
      payload: {
        cart: response.cart,
      },
    });
  }
};

const emptyCart = (cartDispatch, cartActionTypes) => {
  cartDispatch({
    type: cartActionTypes.EMPTY_CART,
  });
};

const syncWishlist = async (wishlistDispatch, wishlistActionTypes) => {
  const response = await getUserWishlist();
  if (response.success) {
    wishlistDispatch({
      type: wishlistActionTypes.SYNC_WISHLIST,
      payload: {
        wishlist: response.wishlist,
      },
    });
  }
};

const emptyWishlist = async (wishlistDispatch, wishlistActionTypes) => {
  wishlistDispatch({
    type: wishlistActionTypes.EMPTY_WISHLIST,
  });
};

const syncAddresses = async (userDispatch, userActionTypes) => {
  const response = await getAddresses();
  if (response.success) {
    userDispatch({
      type: userActionTypes.SYNC_ADDRESSES,
      payload: {
        addresses: response.addresses,
      },
    });
  }
};

export function UserContextProvider({ children }) {
  const initialUserState = {
    name: "",
    email: "",
    isLoggedIn: isLoggedInLocally(),
    shippingAddresses: [],
    paymentInfo: {
      cardNumber: "",
      cardName: "",
    },
  };

  const [user, userDispatch] = useReducer(userReducer, initialUserState);

  const { cartDispatch, cartActionTypes } = useCart();
  const { wishlistDispatch, wishlistActionTypes } = useWishlist();

  useEffect(() => {
    if (user.isLoggedIn) {
      syncCart(cartDispatch, cartActionTypes);
      syncWishlist(wishlistDispatch, wishlistActionTypes);
      syncAddresses(userDispatch, userActionTypes);
    } else {
      emptyCart(cartDispatch, cartActionTypes);
      emptyWishlist(wishlistDispatch, wishlistActionTypes);
    }
  }, [user.isLoggedIn]);

  return (
    <UserContext.Provider value={{ user, userDispatch, userActionTypes }}>
      {children}
    </UserContext.Provider>
  );
}
