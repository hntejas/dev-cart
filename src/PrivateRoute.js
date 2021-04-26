import { useContext } from "react";
import { Route } from "react-router-dom";
import Login from "./components/Auth/Login/Login";

import { UserContext } from "./store/user/userContext";

export default function PrivateRoute({ path, ...props }) {
  const { user } = useContext(UserContext);
  return user.isLoggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Route {...props} element={<Login from={path} />} />
  );
}
