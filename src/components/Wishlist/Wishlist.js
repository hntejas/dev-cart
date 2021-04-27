import { useContext } from "react";

import ProductList from "../ProductListing/ProductList/ProductList";
import { WishlistContext } from "../../store/wishlist/wishlistContext";
import "./wishlist.css";

export default function Wishlist() {
  const { wishlist } = useContext(WishlistContext);
  return (
    <>
      <div className="wishlist-container">
        <h2 className="wishlist-header">Wishlist</h2>
        <ProductList productsToDisplay={wishlist} />
      </div>
    </>
  );
}
