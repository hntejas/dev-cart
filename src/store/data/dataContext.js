import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export function DataContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadProducts(setProducts);
    loadBrands(setBrands);
    loadCategories(setCategories);
  }, []);

  const loadProducts = async (setProducts) => {
    const response = await axios.get(
      "https://dev-cart.hntejas.repl.co/products"
    );
    if (response.data.success) {
      const productsFormatted = response.data.products.map((product) => {
        return { ...product, id: product._id, _id: undefined };
      });
      setProducts(productsFormatted);
    }
  };

  const loadBrands = async (setBrands) => {
    const response = await axios.get("https://dev-cart.hntejas.repl.co/brands");
    if (response.data.success) {
      const brandsFormatted = response.data.brands.map((brand) => {
        return { ...brand, id: brand._id, _id: undefined };
      });
      setBrands(brandsFormatted);
    }
  };

  const loadCategories = async (setCategories) => {
    const response = await axios.get(
      "https://dev-cart.hntejas.repl.co/categories"
    );
    if (response.data.success) {
      const categoriesFormatted = response.data.categories.map((category) => {
        return { ...category, id: category._id, _id: undefined };
      });
      setCategories(categoriesFormatted);
    }
  };

  return (
    <DataContext.Provider value={{ products, brands, categories }}>
      {children}
    </DataContext.Provider>
  );
}
