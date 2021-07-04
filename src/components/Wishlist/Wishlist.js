import ProductList from "../ProductListing/ProductList/ProductList";
import { useWishlist } from "../../store/wishlist";
import "./wishlist.css";

export default function Wishlist() {
  const { wishlist } = useWishlist();
  return (
    <>
      <div className="wishlist-container">
        <h2 className="wishlist-header">Wishlist</h2>
        <ProductList productsToDisplay={wishlist} />
      </div>
    </>
  );
}
