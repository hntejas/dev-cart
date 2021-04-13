import React, { useState } from "react";

import ProductListingFilter from "./ProductListingFilter/ProductListingFilter";
import ProductList from "./ProductList/ProductList";

import { useContext } from "react";
import { ProductFiltersContext } from "../../store/product-filter/productFilterContext";

import "./product-listing.css";
import { BsFilterRight } from "react-icons/bs";

export default function ProductListing({ products }) {
  const { productFilters } = useContext(ProductFiltersContext);

  const productsToDisplay = filterAndSortProducts();

  const [showFilter, setShowFilter] = useState(false);

  const toggleFilterModal = () => {
    setShowFilter(!showFilter);
  };

  function filterAndSortProducts() {
    let filteredProducts = products;
    if (productFilters.categories.length > 0) {
      filteredProducts = products.filter((product) =>
        productFilters.categories.includes(product.category)
      );
    }
    if (productFilters.brands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        productFilters.brands.includes(product.brand)
      );
    }
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= productFilters.priceRange.minimum &&
        product.price <= productFilters.priceRange.maximum
    );
    filteredProducts = filteredProducts.filter(
      (product) => product.rating >= productFilters.minimumRating
    );
    if (!productFilters.includeOutOfStock) {
      filteredProducts = filteredProducts.filter(
        (product) => product.availability === "IN_STOCK"
      );
    }
    return filteredProducts;
  }

  return (
    <div style={{ display: "flex" }}>
      <div
        className={showFilter ? "product-filter" : "product-filter hide-filter"}
      >
        <ProductListingFilter />
      </div>
      <ProductList productsToDisplay={productsToDisplay} />
      <div className="btn-filter-mobile" onClick={toggleFilterModal}>
        <BsFilterRight />
      </div>
      <div
        className={showFilter ? "filter-modal" : "filter-modal hide-filter"}
      ></div>
    </div>
  );
}
