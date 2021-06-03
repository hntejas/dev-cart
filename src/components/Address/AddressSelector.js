import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import Modal from "../UI/Modal/Modal";
import React, { useMemo, useState } from "react";
import { useUser } from "../../store/user";
import { removeAddress } from "../../services/address.service";

export default function AddressSelector({
  addresses,
  selectedAddress,
  selectAddressHandler,
}) {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState();
  const { userDispatch, userActionTypes } = useUser();

  console.log("render");

  const editAddress = (address) => {
    setAddressToEdit(address);
    setShowAddressForm(true);
  };

  const deleteAddress = async (addressId) => {
    const response = await removeAddress(addressId);
    if (response.success) {
      userDispatch({
        type: userActionTypes.REMOVE_ADDRESS,
        payload: {
          addressId: addressId,
        },
      });
    }
  };

  return (
    <>
      {addresses.map((address) => {
        if (!address) {
          return null;
        }
        return (
          <div className="address-selector-card" key={address._id}>
            <label className="address-selector-group">
              <input
                type="radio"
                value={address._id}
                name="address"
                onChange={() => selectAddressHandler(address)}
                checked={selectedAddress && selectedAddress._id === address._id}
              />
              <AddressCard address={address} />
            </label>
            <div>
              <button
                className="btn-cart-product-action"
                onClick={() => editAddress(address)}
              >
                Edit
              </button>
              <div
                className="btn-cart-product-action"
                onClick={() => deleteAddress(address._id)}
              >
                Remove
              </div>
            </div>
          </div>
        );
      })}
      {showAddressForm && (
        <Modal
          closeModal={() => {
            setShowAddressForm(false);
          }}
          isOpen={showAddressForm}
        >
          <AddressForm
            address={addressToEdit}
            closeModal={() => {
              setShowAddressForm(false);
            }}
          />
        </Modal>
      )}
    </>
  );
}
