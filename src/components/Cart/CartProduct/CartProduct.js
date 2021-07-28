import Button from "../../UI/Button/Button";
import Counter from "../../Counter/Counter";
import { useCart } from "../../../store/cart";
import {
  updateItemQuantity,
  removeItemFromCart,
} from "../../../services/cart.service";
import { formatPrice, showToast } from "../../../utils/helper";
import "./cart-product.css";
import { useState } from "react";

export default function CartProduct({ cartLine, readOnly = false }) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { cartDispatch, cartActionTypes } = useCart();
  const { id, title, brand, imgUrl, price, basePrice } = cartLine.product;
  const discount =
    basePrice && basePrice > price
      ? parseInt(((basePrice - price) / basePrice) * 100, 10)
      : null;

  const updateQuantity = async (type) => {
    const newQuantity =
      type === "DECREMENT" ? cartLine.quantity - 1 : cartLine.quantity + 1;
    try {
      setLoading(true);
      const response = await updateItemQuantity(cartLine.id, newQuantity);
      if (response.success) {
        cartDispatch({
          type: cartActionTypes.UPDATE_QUANTITY,
          payload: {
            cartId: cartLine.id,
            newQuantity: newQuantity,
          },
        });
        showToast(<p>Product quantity updated to {newQuantity}</p>);
      } else {
        showToast(<p>Ops! Could not update, please try again later</p>);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  const removeItem = async () => {
    try {
      setIsRemoving(true);
      const response = await removeItemFromCart(cartLine.id);
      if (response.success) {
        setIsRemoving(false);
        cartDispatch({
          type: cartActionTypes.REMOVE_FROM_CART,
          payload: {
            cartId: cartLine.id,
          },
        });
        showToast(<p>Item removed</p>);
      }
    } catch (e) {
      console.error(e);
      setIsRemoving(false);
    }
  };

  return (
    <div className="cart-product-container">
      <img src={imgUrl} alt={title} className="cart-product-img" />
      <div className="cart-product-details">
        <p className="card-product-title">{title}</p>
        <p className="card-product-brand">{brand}</p>
        <div className="card-pricing-container">
          <span className="card-product-price">
            {formatPrice(price * cartLine.quantity)}
          </span>

          {basePrice ? (
            <>
              <span className="card-product-base-price">
                {formatPrice(basePrice * cartLine.quantity)}
              </span>
              <span className="card-product-discount">
                {discount ? discount + "% off" : null}
              </span>
            </>
          ) : null}
        </div>
      </div>
      <div className="cart-product-action-container">
        {readOnly && <>Quantity : {cartLine.quantity}</>}
        {!readOnly && (
          <>
            <Counter
              value={cartLine.quantity}
              onIncrement={() => updateQuantity("INCREMENT")}
              onDecrement={() => updateQuantity("DECREMENT")}
              disabled={isLoading}
            />
            <Button
              text={isRemoving ? "REMOVING..." : "REMOVE"}
              onClick={removeItem}
              styleClass="btn-cart-product-action"
              disabled={!!isRemoving}
            />
          </>
        )}
      </div>
    </div>
  );
}
