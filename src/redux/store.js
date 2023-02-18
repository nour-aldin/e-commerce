import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import productsReducer from './products/productsSlice'
import modalReducer from './modal/modalSlice'

export default configureStore ({
  reducer: {
    user: userReducer,
    products: productsReducer,
    modal: modalReducer
  },
})