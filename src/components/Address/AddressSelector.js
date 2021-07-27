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
  const [isLoading, setIsLoading] = useState(false);
  const { userDispatch, userActionTypes } = useUser();

  const editAddress = (address) => {
    setAddressToEdit(address);
    setShowAddressForm(true);
  };

  const deleteAddress = async (addressId) => {
    try {
      setIsLoading(true);
      const response = await removeAddress(addressId);
      if (response.success) {
        setIsLoading(false);
        userDispatch({
          type: userActionTypes.REMOVE_ADDRESS,
          payload: {
            addressId: addressId,
          },
        });
      }
    } catch (e) {
      console.error(e);
      setIsLoading(false);
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
                disabled={isLoading}
              >
                Edit
              </button>
              <div
                className="btn-cart-product-action"
                onClick={() => deleteAddress(address._id)}
                disabled={isLoading}
              >
                {isLoading ? "Removing" : "Remove"}
              </div>
            </div>
          </div>
        );
      })}
      {showAddressForm && (
        <Modal closeModal={() => {}} isOpen={showAddressForm}>
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
