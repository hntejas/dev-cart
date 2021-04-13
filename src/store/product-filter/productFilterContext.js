import { createContext, useReducer } from "react";
import filterReducer from "./productFilterReducer";

export const ProductFiltersContext = createContext();

export const initialProductFilters = {
  categories: [],
  brands: [],
  priceRange: {
    minimum: 0,
    maximum: 10000000,
  },
  minimumRating: 0,
  includeOutOfStock: true,
  sorting: "",
};

export function ProductFiltersContextProvider({ children }) {
  const [productFilters, productFiltersDispatch] = useReducer(
    filterReducer,
    initialProductFilters
  );

  return (
    <ProductFiltersContext.Provider
      value={{ productFilters, productFiltersDispatch }}
    >
      {children}
    </ProductFiltersContext.Provider>
  );
}
