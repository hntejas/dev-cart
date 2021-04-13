import "./styles.css";
import ProductListing from "./components/ProductListing/ProductListing";
import Cart from "./components/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import Header from "./components/Header/Header";
import { CartContextProvider } from "./store/cart/cartContext";
import { WishlistContextProvider } from "./store/wishlist/wishlistContext";
import { ProductFiltersContextProvider } from "./store/product-filter/productFilterContext";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { products as productsData } from "./data.js";

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // fetch("https://express-intro.hntejas.repl.co/products")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setProducts(data);
    //   });
    setProducts(productsData);
  }, []);

  return (
    <div className="App">
      <CartContextProvider>
        <WishlistContextProvider>
          <ProductFiltersContextProvider>
            <Header />
            <div className="body-container">
              <Routes>
                <Route
                  path="/"
                  element={<ProductListing products={products} />}
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
              </Routes>
            </div>
          </ProductFiltersContextProvider>
        </WishlistContextProvider>
      </CartContextProvider>
    </div>
  );
}
