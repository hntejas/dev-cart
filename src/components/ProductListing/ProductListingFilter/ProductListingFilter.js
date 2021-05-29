import { useContext, useEffect } from "react";

import { useLocation } from "react-router-dom";

import { useProductFilter } from "../../../store/product-filter/";
import { DataContext } from "../../../store/data/dataContext";
import "./product-listing-filter.css";

export default function ProductListingFilter() {
  const { productFilters, productFiltersDispatch, filterActionTypes } =
    useProductFilter();
  const { brands, categories } = useContext(DataContext);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();

  useEffect(() => {
    const brand = query.get("brand");
    const category = query.get("category");
    brand && handleBrandingFilter(brand);
    category && handleCategoryFilter(category);
    window.scrollTo(0, 0);
  }, []);

  const clearFilters = () => {
    productFiltersDispatch({
      type: filterActionTypes.RESET_FILTERS,
    });
  };

  const handleBrandingFilter = (brand) => {
    productFiltersDispatch({
      type: filterActionTypes.UPDATE_BRANDS,
      payload: {
        brand: brand,
      },
    });
  };
  const handleCategoryFilter = (category) => {
    productFiltersDispatch({
      type: filterActionTypes.UPDATE_CATEGORIES,
      payload: {
        category: category,
      },
    });
  };
  const updateMinimumRatingFilter = (minimumRating) => {
    productFiltersDispatch({
      type: filterActionTypes.UPDATE_MINIMUM_RATING,
      payload: {
        minimumRating: minimumRating,
      },
    });
  };
  const toggleStockAvailabilityFilter = () => {
    productFiltersDispatch({
      type: filterActionTypes.TOGGLE_AVAILABILITY_PREFERENCE,
    });
  };
  return (
    <div className="filter-container">
      <div className="filter-heading">
        <b style={{ fontSize: "1.2rem" }}>Filters</b>
        <span
          style={{ color: "red", cursor: "pointer" }}
          onClick={clearFilters}
        >
          Clear All
        </span>
      </div>

      <ul className="filter-list">
        <li>
          <h4>Brands</h4>
        </li>

        {brands.map((brand) => {
          return (
            <li key={brand.id}>
              <label>
                <input
                  type="checkbox"
                  value={brand.name}
                  checked={productFilters.brands.includes(brand.name)}
                  onChange={() => handleBrandingFilter(brand.name)}
                />
                {brand.name}
              </label>
            </li>
          );
        })}

        <hr />

        <li>
          <h4>Categories</h4>
        </li>

        {categories.map((category) => {
          return (
            <li key={category.id}>
              <label>
                <input
                  type="checkbox"
                  value={category.name}
                  checked={productFilters.categories.includes(category.name)}
                  onChange={() => {
                    handleCategoryFilter(category.name);
                  }}
                />
                {category.name}
              </label>
            </li>
          );
        })}

        <hr />
        <li>
          <h4>Customer Ratings</h4>
        </li>
        {Array(5)
          .fill(5)
          .map((stars, index) => {
            return (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    value={stars}
                    checked={productFilters.minimumRating === index + 1}
                    onChange={() => updateMinimumRatingFilter(index + 1)}
                  />
                  {index + 1} stars {index < 4 && "& above"}
                </label>
              </li>
            );
          })}

        <hr />
        <li>
          <h4>Availability</h4>
        </li>

        <li>
          <label>
            <input
              type="checkbox"
              checked={productFilters.includeOutOfStock}
              onChange={() => toggleStockAvailabilityFilter()}
            />
            Include out of stock
          </label>
        </li>
      </ul>
    </div>
  );
}
