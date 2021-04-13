import { useContext } from "react";
import "./wishlist.css";

import ProductList from "../ProductListing/ProductList/ProductList";
import { WishlistContext } from "../../store/wishlist/wishlistContext";

export default function Wishlist() {
  const { wishlist } = useContext(WishlistContext);
  return (
    <>
      <div className="wishlist-container">
        <h2
          style={{
            textAlign: "left",
            paddingLeft: "0.5rem",
            margin: "0.5rem 0",
          }}
        >
          Wishlist
        </h2>
        <ProductList productsToDisplay={wishlist} />
      </div>
    </>
  );
}
