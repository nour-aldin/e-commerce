import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import productsReducer from './products/productsSlice'
import modalReducer from './modal/modalSlice'
import cartSlice from './cart/cartSlice';

export default configureStore ({
  reducer: {
    user: userReducer,
    products: productsReducer,
    cart: cartSlice,
    modal: modalReducer,
  },
})