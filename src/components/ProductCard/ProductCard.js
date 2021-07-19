import { useContext } from "react";

import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { Rating } from "@material-ui/lab";

import Button from "../UI/Button/Button";
import { useCart } from "../../store/cart";
import { useUser } from "../../store/user";
import { useWishlist } from "../../store/wishlist";
import { formatPrice, showToast } from "../../utils/helper";

import { addItemToCart } from "../../services/cart.service";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../services/wishlist.service";
import "./product-card.css";

export default function ProductCard({ product }) {
  const { id, imgUrl, brand, title, price, basePrice, rating, availability } =
    product;
  const discount =
    basePrice && basePrice > price
      ? parseInt(((basePrice - price) / basePrice) * 100, 10)
      : null;

  const { cart, cartDispatch, cartActionTypes } = useCart();
  const { wishlist, wishlistDispatch, wishlistActionTypes } = useWishlist();
  const { user } = useUser();

  const isProductInCart =
    user.isLoggedIn &&
    !!cart.cartLines.find((cartLine) => cartLine.product.id === id);

  const isProductInWishlist =
    user.isLoggedIn &&
    !!wishlist.find((wishlistProduct) => wishlistProduct.id === id);

  const addToCart = async (product) => {
    if (!user.isLoggedIn) {
      showToast(
        <p>
          Pease{" "}
          <Link to="/login" style={{ color: "blue" }}>
            LOGIN
          </Link>{" "}
          to use the cart
        </p>
      );
      return;
    } else {
      (async () => {
        const response = await addItemToCart(product.id);
        if (response.success) {
          cartDispatch({
            type: cartActionTypes.ADD_TO_CART,
            payload: {
              cartId: response.cartId,
              product: product,
              quantity: 1,
            },
          });
          showToast(<p>Item added to cart!</p>);
        } else {
          showToast(<p>Ops! Something went wrong</p>);
        }
      })();
    }
  };

  const toggleWishlist = async () => {
    if (!user.isLoggedIn) {
      showToast(
        <p>
          Please{" "}
          <Link to="/login" style={{ color: "blue" }}>
            LOGIN
          </Link>{" "}
          to add to wishlist
        </p>
      );
      return;
    } else {
      const response = isProductInWishlist
        ? await removeItemFromWishlist(id)
        : await addItemToWishlist(id);
      if (response.success) {
        wishlistDispatch({
          type: wishlistActionTypes.SYNC_WISHLIST,
          payload: {
            wishlist: response.wishlist,
          },
        });
        showToast(
          <p>
            {isProductInWishlist
              ? "Removed from wishlist"
              : "Added to wishlist!"}
          </p>
        );
      }
    }
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
            <FaHeart style={{ color: "#F71490" }} />
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
