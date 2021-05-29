import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { DataContextProvider } from "./store/data/dataContext";
import { UserContextProvider } from "./store/user/userContext";
import { CartContextProvider } from "./store/cart/cartContext";
import { WishlistContextProvider } from "./store/wishlist/wishlistContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <DataContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <UserContextProvider>
            <Router>
              <App />
            </Router>
          </UserContextProvider>
        </WishlistContextProvider>
      </CartContextProvider>
    </DataContextProvider>
  </StrictMode>,
  rootElement
);
