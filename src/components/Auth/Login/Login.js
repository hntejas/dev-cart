import { useState, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../../../store/user/userContext";
import * as userActionTypes from "../../../store/types/userActionType";
import { showToast } from "../../../utils/helper";
import "../auth.css";

export default function Login({ from }) {
  const validators = {
    email: (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    password: (password) => {
      return password && password.length > 0;
    },
  };
  const initialUserData = {
    email: {
      value: "",
      isValid: false,
      errorMessage: "Enter valid email",
    },
    password: {
      value: "",
      isValid: false,
      errorMessage: "Enter valid password",
    },
  };

  const { userDispatch } = useContext(UserContext);
  const [userData, setUserData] = useState(initialUserData);
  const [showErrors, setShowErrors] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const isEmailvalid = validateForm();
    if (!isEmailvalid) {
      setShowErrors(true);
    } else {
      if (isLoginValid().success) {
        userDispatch({
          type: userActionTypes.UPDATE_USER_LOGIN,
          payload: {
            isLoggedIn: true,
          },
        });
        navigate(from || -1);
      } else {
        showToast(isLoginValid().errorMsg);
      }
    }
  };

  const onChangeHandler = (e) => {
    showErrors && setShowErrors(false);
    const currentTarget = e.currentTarget;
    const id = e.currentTarget.id;
    setUserData(function (state) {
      const stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy[id].isValid = validateField(id, currentTarget.value);
      stateCopy[id].value = currentTarget.value;
      return stateCopy;
    });
  };

  const isLoginValid = () => {
    const existingUsers =
      (localStorage.getItem("authUsers") &&
        JSON.parse(localStorage.getItem("authUsers"))) ||
      [];
    const isUserPresent = existingUsers.find(
      (user) => user.email === userData.email.value
    );
    const isPasswordValid =
      isUserPresent && isUserPresent.password === userData.password.value;
    return {
      success: isUserPresent && isPasswordValid,
      errorMsg: isUserPresent
        ? "Invalid password!"
        : "User does not exist, please Signup",
    };
  };

  const validateField = (field, value) => {
    return validators[field](value);
  };

  const validateForm = () => {
    const isFormValid = true;
    for (let field in userData) {
      if (!userData[field].isValid) {
        return false;
      }
    }
    return isFormValid;
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={onSubmit}>
        <h3>Login</h3>
        <label>Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter Email"
          value={userData.email.value}
          onChange={onChangeHandler}
        />
        <p
          className="error-input"
          style={{
            display: !userData.email.isValid && showErrors ? "block" : "none",
          }}
        >
          {userData.email.errorMessage}
        </p>
        <label>Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter Password"
          value={userData.password.value}
          onChange={onChangeHandler}
        />
        <p
          className="error-input"
          style={{
            display:
              !userData.password.isValid && showErrors ? "block" : "none",
          }}
        >
          {userData.password.errorMessage}
        </p>
        <button type="submit" className="auth-btn">
          login
        </button>
        <p>
          Not a user? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}
