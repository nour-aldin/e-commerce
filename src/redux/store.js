import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user/userSlice';
import productsReducer from './products/productsSlice'
import modalReducer from './modal/modalSlice'
import cartReducer from './cart/cartSlice';
import orderReducer from './orders/orderSlice'

import thunk from 'redux-thunk'

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage
}

export const store = configureStore ({
  reducer: {
    user: userReducer,
    products: productsReducer,
    cart: persistReducer(persistConfig, cartReducer),
    modal: modalReducer,
    order: orderReducer
  },
  middleware: [thunk]
})






// export const persistedReducer = persistReducer(persistConfig, store)

export const persistor = persistStore(store)

export default {
  store,
  persistor,
}