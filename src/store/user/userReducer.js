import * as userActionTypes from "./userActionType";

const updateUserLogin = (state, { isLoggedIn, name }) => {
  if (!isLoggedIn) {
    localStorage.removeItem("devCartAuth");
  }
  return { ...state, isLoggedIn: isLoggedIn, name: name };
};

const syncAddresses = (state, { addresses }) => {
  const stateCopy = { ...state };
  stateCopy.shippingAddresses = addresses;
  return stateCopy;
};

const addAddress = (state, { address }) => {
  const stateCopy = { ...state };
  stateCopy.shippingAddresses = state.shippingAddresses.concat(address);
  return stateCopy;
};

const editAddress = (state, { address }) => {
  const stateCopy = { ...state };

  stateCopy.shippingAddresses = state.shippingAddresses.map((currAddress) => {
    if (currAddress._id === address._id) {
      return { ...address };
    }
    return currAddress;
  });

  return stateCopy;
};

const removeAddress = (state, { addressId }) => {
  const stateCopy = { ...state };

  stateCopy.shippingAddresses = state.shippingAddresses.filter(
    (currAddress) => {
      return currAddress._id !== addressId;
    }
  );

  return stateCopy;
};

export default function userReducer(state, action) {
  switch (action.type) {
    case userActionTypes.UPDATE_USER_LOGIN:
      return updateUserLogin(state, action.payload);
    case userActionTypes.SYNC_ADDRESSES:
      return syncAddresses(state, action.payload);
    case userActionTypes.ADD_ADDRESS:
      return addAddress(state, action.payload);
    case userActionTypes.EDIT_ADDRESS:
      return editAddress(state, action.payload);
    case userActionTypes.REMOVE_ADDRESS:
      return removeAddress(state, action.payload);
    default:
      return state;
  }
}
