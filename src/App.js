import { useContext } from "react";

import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./components/Auth/Login/Login";
import SignUp from "./components/Auth/SignUp/SignUp";
import PrivateRoute from "./utils/PrivateRoute";
import Home from "./components/Home/Home";
import ProductListing from "./components/ProductListing/ProductListing";
import Cart from "./components/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import Header from "./components/Header/Header";
import Checkout from "./components/Checkout/Checkout";
import { DataContext } from "./store/data/dataContext";

import { ProductFiltersContextProvider } from "./store/product-filter/productFilterContext";
import { Routes, Route } from "react-router-dom";
import { axiosInterceptor } from "./utils/useAxios";
import Loader from "./components/UI/Loader/Loader";

export default function App() {
  let { products } = useContext(DataContext);

  const { loading, loaderText } = axiosInterceptor();

  return (
    <div className="App">
      <ToastContainer />
      <Loader showLoader={loading} loaderText={loaderText} />
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
          <PrivateRoute path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </div>
  );
}
