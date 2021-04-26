import { createContext, useReducer } from "react";
import userReducer from "./userReducer";

const initialUserState = {
  name: "",
  email: "",
  isLoggedIn: false,
  addresses: [],
};

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, userDispatch] = useReducer(userReducer, initialUserState);
  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
}
