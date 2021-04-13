import { useContext } from "react";
import { CartContext } from "../../store/cart/cartContext";
import { WishlistContext } from "../../store/wishlist/wishlistContext";
import { ADD_TO_CART } from "../../store/constants/cartActionType";
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../../store/constants/wishlistActionType";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

import { Rating } from "@material-ui/lab";
import Button from "../UI/Button/Button";
import { formatPrice } from "../../utils/helper";
import "./product-card.css";

export default function ProductCard({ product }) {
  const {
    id,
    imgUrl,
    brand,
    title,
    price,
    basePrice,
    rating,
    availability,
  } = product;
  const discount =
    basePrice && basePrice > price
      ? parseInt(((basePrice - price) / basePrice) * 100, 10)
      : null;

  const { cart, cartDispatch } = useContext(CartContext);
  const { wishlist, wishlistDispatch } = useContext(WishlistContext);

  const isProductInCart = !!cart.cartLines.find(
    (cartLine) => cartLine.product.id === id
  );

  const isProductInWishlist = !!wishlist.find(
    (wishlistProduct) => wishlistProduct.id === id
  );

  const addToCart = (product) => {
    cartDispatch({
      type: ADD_TO_CART,
      payload: {
        product: product,
      },
    });
  };

  const toggleWishlist = () => {
    let data = {
      type: isProductInWishlist ? REMOVE_FROM_WISHLIST : ADD_TO_WISHLIST,
      payload: {
        product: product,
      },
    };
    wishlistDispatch(data);
  };

  const buttonText = !!isProductInCart
    ? "In Cart"
    : availability === "IN_STOCK"
    ? "Add to cart"
    : "Out of Stock";

  return (
    <div className="card-container">
      <div className="card-img-container">
        <img src={imgUrl} alt={title} className="card-img"></img>
        <div className="btn-wishlist-container" onClick={toggleWishlist}>
          {isProductInWishlist ? (
            <FaHeart style={{ color: "red" }} />
          ) : (
            <FiHeart />
          )}
        </div>
      </div>
      <div className="card-details-container">
        <p className="card-product-brand">{brand}</p>
        <p className="card-product-title">{title}</p>
        <Rating readOnly={true} value={rating} size="small" />
        <div className="card-pricing-container">
          <span className="card-product-price">{formatPrice(price)}</span>

          {basePrice ? (
            <>
              <span className="card-product-base-price">
                {formatPrice(basePrice)}
              </span>
              <span className="card-product-discount">
                {discount ? discount + "% off" : null}
              </span>
            </>
          ) : null}
        </div>
      </div>
      <Button
        text={buttonText}
        disabled={availability !== "IN_STOCK" || !!isProductInCart}
        onClick={() => addToCart(product)}
      />
    </div>
  );
}
