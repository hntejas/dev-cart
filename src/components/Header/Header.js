import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiShoppingCart } from "react-icons/hi";
import "./header.css";
import { useState } from "react";

export default function Header() {
  const [showNav, setShowNav] = useState(false);
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
        <Link to="/" className="header-nav-link">
          Shop
        </Link>
        <Link to="/cart" className="header-nav-link">
          Cart
        </Link>
        <Link to="/wishlist" className="header-nav-link">
          Wishlist
        </Link>
        <Link to="/cart" className="header-nav-link">
          Login
        </Link>
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
