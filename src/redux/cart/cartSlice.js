import { createSlice } from "@reduxjs/toolkit";
import { handleAddToCart, handleRemoveCartItem, handleReduceCartItem } from "./cart.utils";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalNumCartItems: 0,
    totalPrice: 0
  },
  reducers: {
    addToCart: (state, action)  => {
      state.cartItems = handleAddToCart(state.cartItems, action.payload);

    },
    removeCartItem: (state, action) => {
      state.cartItems = handleRemoveCartItem(state.cartItems, action.payload)


    },
    reduceCartItem: (state, action) => {
      state.cartItems = handleReduceCartItem(state.cartItems, action.payload)
      
    },
    clearCart: (state) => {
      state.cartItems = []
    }
  },
});

export const { addToCart, removeCartItem, reduceCartItem,  clearCart} = cartSlice.actions;
export const selectState = (state) => state.cart;

export const selectCartItems = (state) => state.cart.cartItems;

export const selectTotalNumCartItems = (state) => state.cart.cartItems.reduce(
  (quantity, cartItem) => quantity + cartItem.quantity,
  0
);
export const selectCartTotal = state =>  state.cart.cartItems.reduce(
  (quantity, cartItem) => quantity + cartItem.quantity * cartItem.price,
  0
)

export default cartSlice.reducer;
