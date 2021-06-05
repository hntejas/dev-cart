import { useState } from "react";
import "./address.css";
import { addAddress, editAddress } from "../../services/address.service";
import { useUser } from "../../store/user";

export default function AddressForm({ address: currentAddress, closeModal }) {
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
      regex: /^[a-zA-Z0-9_#,&@!%$ .-]*$/,
      style: "",
    },
    city: {
      isValid: false,
      value: "",
      isTouched: false,
      isRequired: true,
      regex: /^[a-zA-Z .-]*$/,
      style: "",
    },
    state: {
      isValid: false,
      value: "",
      isTouched: false,
      isRequired: true,
      regex: /^[a-zA-Z .-]*$/,
      style: "",
    },
    zip: {
      isValid: false,
      value: "",
      isTouched: false,
      isRequired: true,
      regex: /^.[0-9]{5,}$/,
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

  if (currentAddress) {
    mapInitialAddressValuesToState();
  }

  const { userDispatch, userActionTypes } = useUser();
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

  const submitAddress = async () => {
    const isFormValid = validateForm();
    if (!isFormValid) return;
    const addressObj = getAddressObj();
    const response = !currentAddress
      ? await addAddress(addressObj)
      : await editAddress({ ...addressObj, _id: currentAddress._id });
    if (response.success) {
      userDispatch({
        type: !currentAddress
          ? userActionTypes.ADD_ADDRESS
          : userActionTypes.EDIT_ADDRESS,
        payload: {
          address: { ...addressObj, _id: response.addressId },
        },
      });
      closeModal && closeModal();
    }
  };

  const validateForm = () => {
    const addressCopy = { ...address };
    let isFormValid = true;
    for (let addressFeild in addressCopy) {
      const input = addressCopy[addressFeild];
      input.isValid = input.isRequired
        ? !!input.value && input.regex.test(input.value)
        : true;
      input.style = "";
      if (!input.isValid) {
        input.style = "invalid-input";
        isFormValid = false;
      }
    }
    setAddress(addressCopy);
    return isFormValid;
  };

  const getAddressObj = () => {
    const addressObj = {};
    for (let addressField in address) {
      const input = address[addressField];
      addressObj[addressField] = input.value;
    }
    return addressObj;
  };

  function mapInitialAddressValuesToState() {
    for (let addressField in initialAddressState) {
      initialAddressState[addressField].value = currentAddress[addressField];
    }
  }

  return (
    <div className="address-form">
      <div className="address-form-header">
        <h3>Shipping Address</h3>
        {closeModal && (
          <button onClick={closeModal} className="modal-close-btn">
            &#x274C;
          </button>
        )}
      </div>
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
      <button className="btn btn-primary" onClick={submitAddress}>
        {currentAddress ? "Save" : "Add"}
      </button>
    </div>
  );
}
