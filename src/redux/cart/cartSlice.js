import { createSlice } from "@reduxjs/toolkit";
import { handleAddToCart } from "./cart.utils";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalNumCartItems: 0,
  },
  reducers: {
    addToCart: (state, action)  => {
      state.cartItems = handleAddToCart(state.cartItems, action.payload);

        state.totalNumCartItems = state.cartItems.reduce(
          (quantity, cartItem) => quantity + cartItem.quantity,
          0
        );
    },
  },
});

export const { addToCart } = cartSlice.actions;
export const selectState = (state) => state.cart;

export const selectCartItems = (state) => state.cart.selectCartItems;
export const selectTotalNumCartItems = (state) => state.cart.totalNumCartItems;

export default cartSlice.reducer;
