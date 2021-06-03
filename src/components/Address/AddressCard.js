export default function AddressCard({ address }) {
  return (
    <div className="address-card">
      <div>{address.addressLine1},</div>
      <div>{address.addressLine2}, </div>
      <div>
        {address.city}, {address.state}, {address.pinCode}
      </div>
      <div>{address.phone}</div>
    </div>
  );
}
