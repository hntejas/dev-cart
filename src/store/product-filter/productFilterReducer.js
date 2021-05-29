import * as filterActionTypes from "./filterActionType";
import { initialProductFilters } from "./productFilterContext";

const updateBrands = (state, { brand }) => {
  const stateCopy = { ...state };
  const isBrandPresent = state.brands.find((currBrand) => currBrand === brand);
  if (!isBrandPresent) {
    stateCopy.brands = [...state.brands, brand];
  } else {
    stateCopy.brands = state.brands.filter((currBrand) => currBrand !== brand);
  }
  return stateCopy;
};

const updateCategories = (state, { category }) => {
  const stateCopy = { ...state };
  const isCategoryPresent = state.categories.find(
    (currCategory) => currCategory === category
  );
  if (!isCategoryPresent) {
    stateCopy.categories = [...state.categories, category];
  } else {
    stateCopy.categories = state.categories.filter(
      (currCategory) => currCategory !== category
    );
  }
  return stateCopy;
};

const updateMinimumRating = (state, { minimumRating }) => {
  return { ...state, minimumRating: minimumRating };
};

const toggleAvailabilityPreference = (state) => {
  return { ...state, includeOutOfStock: !state.includeOutOfStock };
};

const resetFilters = () => {
  return initialProductFilters;
};

export default function filterReducer(state, action) {
  switch (action.type) {
    case filterActionTypes.UPDATE_BRANDS:
      return updateBrands(state, action.payload);
    case filterActionTypes.UPDATE_CATEGORIES:
      return updateCategories(state, action.payload);
    case filterActionTypes.UPDATE_MINIMUM_RATING:
      return updateMinimumRating(state, action.payload);
    case filterActionTypes.TOGGLE_AVAILABILITY_PREFERENCE:
      return toggleAvailabilityPreference(state);
    case filterActionTypes.RESET_FILTERS:
      return resetFilters();
    default:
      return state;
  }
}
