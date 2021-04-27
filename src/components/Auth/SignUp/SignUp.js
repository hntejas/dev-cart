import { useState } from "react";

import { Link } from "react-router-dom";

import { showToast } from "../../../utils/helper";
import "../auth.css";

export default function SignUp() {
  const validators = {
    name: (name) => {
      return name.length > 0;
    },
    email: (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    password: (password) => {
      const re = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
      return re.test(String(password).toLowerCase());
    },
    reconfirmPassword: (reconfirmPassword) => {
      return reconfirmPassword === userData.password.value;
    },
  };
  const initialUserData = {
    name: {
      value: "",
      isValid: false,
      errorMessage: "Please enter name",
    },
    email: {
      value: "",
      isValid: false,
      errorMessage: "Please enter valid email",
    },
    password: {
      value: "",
      isValid: false,
      errorMessage:
        "Password must be atleast 8 characters with minimum 1 number and 1 letter",
    },
    reconfirmPassword: {
      value: "",
      isValid: false,
      errorMessage: "Password does not match",
    },
  };

  const [userData, setUserData] = useState(initialUserData);
  const [showErrors, setShowErrors] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (!isFormValid) {
      setShowErrors(true);
    } else {
      const user = {
        email: userData.email.value,
        password: userData.password.value,
      };
      const existingUsers =
        (localStorage.getItem("authUsers") &&
          JSON.parse(localStorage.getItem("authUsers"))) ||
        [];

      const isUserPresent = !!existingUsers.find(
        (user) => user.email === userData.email.value
      );
      if (isUserPresent) {
        showToast(<p>User already exists, Please LOGIN</p>);
        return;
      }
      localStorage.setItem(
        "authUsers",
        JSON.stringify([...existingUsers, user])
      );
      showToast(<p>Signup Successful, please LOGIN</p>);
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
        <h3>Signup</h3>
        <label>Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter Name"
          value={userData.name.value}
          onChange={onChangeHandler}
        />
        <p
          className="error-input"
          style={{
            display: !userData.name.isValid && showErrors ? "block" : "none",
          }}
        >
          {userData.name.errorMessage}
        </p>
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
          value={userData.password.value}
          placeholder="Enter Password"
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
        <label>Confirm Password</label>
        <input
          id="reconfirmPassword"
          type="password"
          value={userData.reconfirmPassword.value}
          placeholder="Re-Enter Password"
          onChange={onChangeHandler}
        />
        <p
          className="error-input"
          style={{
            display:
              !userData.reconfirmPassword.isValid && showErrors
                ? "block"
                : "none",
          }}
        >
          {userData.reconfirmPassword.errorMessage}
        </p>
        <button type="submit" className="auth-btn">
          Signup
        </button>
        <p>
          Already a user? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
