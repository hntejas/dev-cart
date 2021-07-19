import { Link } from "react-router-dom";

import ProductList from "../ProductListing/ProductList/ProductList";
import { useWishlist } from "../../store/wishlist";
import EmptyCartImg from "../../assets/empty_wishlist.svg";
import "./wishlist.css";

export default function Wishlist() {
  const { wishlist } = useWishlist();
  return (
    <>
      <div className="wishlist-container">
        {wishlist.length > 0 ? (
          <>
            <h2 className="wishlist-header">Wishlist</h2>
            <ProductList productsToDisplay={wishlist} />
          </>
        ) : (
          <div className="empty-page-container">
            <img loading="lazy" src={EmptyCartImg} className="empty-img" />
            <h2>Wishlist is Empty</h2>
            <Link to="/shop" className={"btn checkout-btn "}>
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
