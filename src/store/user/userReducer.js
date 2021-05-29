import * as userActionTypes from "./userActionType";

const updateUserLogin = (state, { isLoggedIn }) => {
  if (!isLoggedIn) {
    localStorage.removeItem("devCartAuth");
  }
  return { ...state, isLoggedIn: isLoggedIn };
};

export default function userReducer(state, action) {
  switch (action.type) {
    case userActionTypes.UPDATE_USER_LOGIN:
      return updateUserLogin(state, action.payload);
    default:
      return state;
  }
}
