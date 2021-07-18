import CartProduct from "../CartProduct/CartProduct";
import "./cart-product-listing.css";

export default function CartProductListing({ cartLines, readOnly }) {
  return (
    <>
      <div className="cart-product-listing-header">
        <b> My Cart </b>
      </div>
      <div>
        {cartLines.map((cartLine) => (
          <CartProduct
            cartLine={cartLine}
            key={cartLine.product.id}
            readOnly={readOnly}
          />
        ))}
      </div>
    </>
  );
}
