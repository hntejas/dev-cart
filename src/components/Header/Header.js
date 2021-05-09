import { useState, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu, GiHearts } from "react-icons/gi";
import { HiShoppingCart } from "react-icons/hi";

import { UserContext } from "../../store/user/userContext";
import { CartContext } from "../../store/cart/cartContext";
import * as userActionTypes from "../../store/types/userActionType";
import "./header.css";

export default function Header() {
  const [showNav, setShowNav] = useState(false);
  const { user, userDispatch } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const logout = () => {
    userDispatch({
      type: userActionTypes.UPDATE_USER_LOGIN,
      payload: {
        isLoggedIn: false,
      },
    });
    navigate("/");
  };

  return (
    <nav className="header">
      <Link to="/" className="header-logo">
        Dev Cart {"<"} <HiShoppingCart /> {">"}
      </Link>
      <div
        className={showNav ? "header-nav" : "header-nav hide-nav"}
        onClick={() => {
          showNav && setShowNav(false);
        }}
      >
        <Link to="/shop" className="header-nav-link">
          Shop
        </Link>
        <Link to="/cart" className="header-nav-link">
          <div className="icon">
            Cart
            {cart.cartQuantity > 0 && user.isLoggedIn && (
              <span className="icon-badge">{cart.cartQuantity}</span>
            )}
          </div>
        </Link>
        <Link to="/wishlist" className="header-nav-link">
          <div>Wishlist</div>
        </Link>
        {!user.isLoggedIn ? (
          <Link to="/login" className="header-nav-link">
            Login
          </Link>
        ) : (
          <div className="header-nav-link" onClick={logout}>
            Logout
          </div>
        )}
      </div>
      <div
        className="mobile-ham"
        onClick={() => {
          setShowNav(!showNav);
        }}
      >
        <GiHamburgerMenu />
      </div>
    </nav>
  );
}
