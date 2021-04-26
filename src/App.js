import { useContext } from "react";

import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./components/Auth/Login/Login";
import SignUp from "./components/Auth/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Home from "./components/Home/Home";
import ProductListing from "./components/ProductListing/ProductListing";
import Cart from "./components/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import Header from "./components/Header/Header";
import { DataContext } from "./store/data/dataContext";
import { UserContextProvider } from "./store/user/userContext";
import { CartContextProvider } from "./store/cart/cartContext";
import { WishlistContextProvider } from "./store/wishlist/wishlistContext";
import { ProductFiltersContextProvider } from "./store/product-filter/productFilterContext";
import { Routes, Route } from "react-router-dom";

export default function App() {
  let { products } = useContext(DataContext);

  return (
    <div className="App">
      <ToastContainer />
      <UserContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <Header />
            <div className="body-container">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<Home />} />
                <ProductFiltersContextProvider>
                  <Route
                    path="/shop"
                    element={<ProductListing products={products} />}
                  />
                </ProductFiltersContextProvider>
                <PrivateRoute path="/cart" element={<Cart />} />
                <PrivateRoute path="/wishlist" element={<Wishlist />} />
              </Routes>
            </div>
          </WishlistContextProvider>
        </CartContextProvider>
      </UserContextProvider>
    </div>
  );
}
