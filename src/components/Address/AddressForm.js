import { useState } from "react";
import "./address-form.css";

export default function AddressForm() {
  const initialAddressState = {
    addressLine1: {
      isValid: false,
      value: "",
      isTouched: false,
      isRequired: true,
      regex: /^[a-zA-Z0-9_#,&@!%$ .-]*$/,
      style: "",
    },
    addressLine2: {
      isValid: true,
      value: "",
      isTouched: false,
      isRequired: false,
      regex: /^[a-zA-Z0-9_.-]*$/,
      style: "",
    },
    city: {
      isValid: false,
      value: "",
      isTouched: false,
      isRequired: true,
      regex: /^[a-zA-Z0-9_.-]*$/,
      style: "",
    },
    state: {
      isValid: false,
      value: "",
      isTouched: false,
      isRequired: true,
      regex: /^[a-zA-Z0-9_.-]*$/,
      style: "",
    },
    zip: {
      isValid: false,
      value: "",
      isTouched: false,
      isRequired: true,
      regex: /^.[0-9]{4,}$/,
      style: "",
    },
    phone: {
      isValid: false,
      value: "",
      isTouched: false,
      isRequired: true,
      regex: /^.[0-9]{8,}$/,
      style: "",
    },
  };

  const [address, setAddress] = useState(initialAddressState);

  const inputHandler = (e) => {
    const fieldId = e.target.id;
    setAddress((address) => {
      const addressCopy = { ...address };
      addressCopy[fieldId].isTouched = true;
      addressCopy[fieldId].value = e.target.value;
      return addressCopy;
    });
  };

  const validateField = (e) => {
    const fieldId = e.target.id;
    setAddress((address) => {
      const addressCopy = { ...address };
      const input = addressCopy[fieldId];
      input.isValid =
        input.isTouched && input.isRequired
          ? !!e.target.value && input.regex.test(e.target.value)
          : true;
      input.style = input.isValid ? "" : "invalid-input";
      return addressCopy;
    });
  };

  const validateForm = () => {
    const addressCopy = { ...address };
    let isFormValid = true;
    for (let addressFeild in addressCopy) {
      const input = addressCopy[addressFeild];
      input.isValid = input.isRequired
        ? !!input.value && input.regex.test(input.value)
        : true;
      if (!input.isValid) {
        isFormValid = false;
      }
    }
    setAddress(addressCopy);
  };

  return (
    <div className="address-form">
      <h3>Shipping Address</h3>
      <input
        id="addressLine1"
        placeholder="Address line 1"
        value={address.addressLine1.value}
        onChange={inputHandler}
        onBlur={validateField}
        className={address.addressLine1.style}
      />
      <input
        id="addressLine2"
        placeholder="Address line 2"
        value={address.addressLine2.value}
        onChange={inputHandler}
        onBlur={validateField}
        className={address.addressLine2.style}
      />
      <input
        id="city"
        placeholder="City"
        value={address.city.value}
        onChange={inputHandler}
        onBlur={validateField}
        className={address.city.style}
      />
      <input
        id="state"
        placeholder="State"
        value={address.state.value}
        onChange={inputHandler}
        onBlur={validateField}
        className={address.state.style}
      />
      <input
        id="zip"
        placeholder="Zip"
        value={address.zip.value}
        onChange={inputHandler}
        onBlur={validateField}
        className={address.zip.style}
      />
      <input
        id="phone"
        placeholder="Phone No"
        value={address.phone.value}
        onChange={inputHandler}
        onBlur={validateField}
        className={address.phone.style}
      />
    </div>
  );
}
