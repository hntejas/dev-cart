import { useUser } from "../../store/user";
import AddressSelector from "./AddressSelector";
import AddressForm from "./AddressForm";
import Modal from "../UI/Modal/Modal";
import "./address.css";
import { useState } from "react";

export default function AddressManager({
  selectAddressHandler,
  selectedAddress,
}) {
  const { user } = useUser();

  const [showAddressForm, setShowAddressForm] = useState(false);
  return (
    <div className="address-manager">
      <div className="address-header">
        <h3>Deliver Here </h3>
        {user.shippingAddresses.length < 3 &&
          user.shippingAddresses.length > 0 && (
            <button
              className="btn btn-primary"
              onClick={() => setShowAddressForm(true)}
            >
              Add Address
            </button>
          )}
      </div>

      {user.shippingAddresses.length < 1 ? (
        <AddressForm />
      ) : (
        <>
          <AddressSelector
            addresses={user.shippingAddresses}
            selectAddressHandler={selectAddressHandler}
            selectedAddress={selectedAddress}
          />
          {showAddressForm && (
            <Modal closeModal={() => {}} isOpen={showAddressForm}>
              <AddressForm closeModal={() => setShowAddressForm(false)} />
            </Modal>
          )}
        </>
      )}
    </div>
  );
}
