import Button from "../../UI/Button/Button";
import Counter from "../../Counter/Counter";

import { CartContext } from "../../../store/cart/cartContext";
import { useContext } from "react";
import {
  UPDATE_QUANTITY,
  REMOVE_FROM_CART,
} from "../../../store/constants/cartActionType";

import { formatPrice } from "../../../utils/helper";
import "./cart-product.css";

export default function CartProduct({ cartLine }) {
  const { cartDispatch } = useContext(CartContext);
  const { id, title, brand, imgUrl, price, basePrice } = cartLine.product;
  const discount =
    basePrice && basePrice > price
      ? parseInt(((basePrice - price) / basePrice) * 100, 10)
      : null;

  const updateQuantity = (type) => {
    cartDispatch({
      type: UPDATE_QUANTITY,
      payload: {
        productId: id,
        newQuantity:
          type === "DECREMENT" ? cartLine.quantity - 1 : cartLine.quantity + 1,
      },
    });
  };

  const removeItem = () => {
    cartDispatch({
      type: REMOVE_FROM_CART,
      payload: {
        productId: id,
      },
    });
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
        <Counter
          value={cartLine.quantity}
          onIncrement={() => updateQuantity("INCREMENT")}
          onDecrement={() => updateQuantity("DECREMENT")}
        />
        <Button
          text="REMOVE"
          onClick={removeItem}
          styleClass="btn-cart-product-action"
        />
      </div>
    </div>
  );
}
