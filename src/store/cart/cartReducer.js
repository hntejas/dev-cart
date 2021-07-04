import * as cartActionTypes from "./cartActionType";

const syncCart = (cartState, { cart }) => {
  const cartStateCopy = { ...cartState };
  cartStateCopy.cartLines = cart.cartLines;
  const updatedCart = updateCartTotalAndQuantity(cartStateCopy);
  return updatedCart;
};

const addToCart = (cartState, { product, quantity }) => {
  const cartStateCopy = { ...cartState };

  const productIndexInCart = cartState.cartLines.findIndex(
    (cartLine) => cartLine.product.id === product.id
  );

  if (productIndexInCart !== -1) {
    return updateQuantity(cartState, {
      productId: product.id,
      newQuantity:
        cartState.cartLines[productIndexInCart].quantity + (quantity || 1),
    });
  }

  cartStateCopy.cartLines = cartState.cartLines.concat({
    product: { ...product },
    quantity: quantity || 1,
    amount: product.price,
    totalBaseAmount: product.basePrice,
  });

  const updatedCart = updateCartTotalAndQuantity(cartStateCopy);
  return updatedCart;
};

const updateQuantity = (cartState, { productId, newQuantity }) => {
  const cartStateCopy = { ...cartState };

  cartStateCopy.cartLines = cartState.cartLines.map((cartLine) => {
    if (cartLine.product.id === productId) {
      return {
        ...cartLine,
        quantity: newQuantity,
        amount: newQuantity * cartLine.product.price,
        totalBaseAmount: newQuantity * cartLine.product.basePrice,
      };
    }
    return { ...cartLine };
  });

  const updatedCart = updateCartTotalAndQuantity(cartStateCopy);
  return updatedCart;
};

const removeFromCart = (cartState, { productId }) => {
  const cartStateCopy = { ...cartState };

  cartStateCopy.cartLines = cartState.cartLines.filter((cartLine) => {
    return cartLine.product.id !== productId;
  });

  const updatedCart = updateCartTotalAndQuantity(cartStateCopy);
  return updatedCart;
};

const emptyCart = (cartState) => {
  const cartStateCopy = { ...cartState };

  cartStateCopy.cartLines = [];

  const updatedCart = updateCartTotalAndQuantity(cartStateCopy);
  return updatedCart;
};

const updateCartTotalAndQuantity = (cartStateCopy) => {
  const { totalCartQuantity, totalCartAmount, totalCartBasePrice } =
    cartStateCopy.cartLines.reduce(
      (acc, cartLine) => {
        return {
          ...acc,
          totalCartQuantity: acc.totalCartQuantity + cartLine.quantity,
          totalCartAmount: acc.totalCartAmount + cartLine.product.price,
          totalCartBasePrice:
            acc.totalCartBasePrice + cartLine.product.basePrice,
        };
      },
      { totalCartQuantity: 0, totalCartAmount: 0, totalCartBasePrice: 0 }
    );

  return {
    ...cartStateCopy,
    cartQuantity: totalCartQuantity,
    totalBasePrice: totalCartBasePrice,
    total: totalCartAmount,
  };
};

export const cartReducer = (cartState, action) => {
  switch (action.type) {
    case cartActionTypes.SYNC_CART:
      return syncCart(cartState, action.payload);
    case cartActionTypes.ADD_TO_CART:
      return addToCart(cartState, action.payload);
    case cartActionTypes.UPDATE_QUANTITY:
      return updateQuantity(cartState, action.payload);
    case cartActionTypes.REMOVE_FROM_CART:
      return removeFromCart(cartState, action.payload);
    case cartActionTypes.EMPTY_CART:
      return emptyCart(cartState);
    default:
      return cartState;
  }
};
