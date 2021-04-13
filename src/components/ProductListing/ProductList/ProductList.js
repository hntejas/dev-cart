import ProductCard from "../../ProductCard/ProductCard";
import "./product-list.css";

export default function ProductList({ productsToDisplay }) {
  return (
    <div className="product-list">
      {productsToDisplay.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
