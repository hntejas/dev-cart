import { useContext } from "react";

import { Link } from "react-router-dom";

import { DataContext } from "../../store/data/dataContext";
import "./home.css";

export default function Home() {
  const { brands, categories } = useContext(DataContext);

  return (
    <>
      <div className="home-banner-container">
        <img
          className="home-banner-img"
          width="auto"
          height="100%"
          src="https://res.cloudinary.com/hntejas/image/upload/v1620548946/dev-cart/category%20images/home-illustration.png"
        ></img>
        <div className="home-banner-content">
          <h2>
            Hello Devs <span role="img">👋</span>
          </h2>
          <p>World's first store for the Developer community!</p>
          <p>One stop to enrich your Developer experience</p>
          <Link to="/shop" className="shop-btn">
            Shop Now
          </Link>
        </div>
      </div>
      <div className="home-container">
        <h2>Range of Categories</h2>
        <div className="feature-container">
          {categories.map((category) => {
            return (
              <Link
                to={"/shop?category=" + category.name}
                className="feature-card"
                key={category.id}
              >
                <img src={category.imgUrl} className="feature-card-img" />
                <h3>{category.name}</h3>
              </Link>
            );
          })}
        </div>
        <h2>Best of Brands</h2>
        <div className="feature-container">
          {brands.map((brand) => {
            return brand.isFeatured ? (
              <Link
                to={"/shop?brand=" + brand.name}
                className="feature-card"
                key={brand.id}
              >
                <img src={brand.imgUrl} className="feature-card-img" />
                {/* <h3>{brand.name}</h3> */}
              </Link>
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}
