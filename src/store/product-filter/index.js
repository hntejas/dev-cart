import { useContext } from "react";
import { ProductFiltersContext } from "./productFilterContext";

export const useProductFilter = () => {
  return useContext(ProductFiltersContext);
};
