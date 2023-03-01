import { createSlice } from "@reduxjs/toolkit";
import { handleSaveOrder,handleGetUserOrderHistory, handleGetUserOrderDetails } from "./order.utils";

import { auth } from "../../firbase/utils";


export const orderSlice = createSlice({
  name: "order",
  initialState: {
    // order: null,
    userOrderHistory: [],
    orderDetails: {},
  },
  reducers:{
    saveOrderHistory: (state, action) => {
      state.userOrderHistory = action.payload
    },
    setUserOrderHistory: (state, action) => {
      state.userOrderHistory = action.payload
    },
    saveOrder: (state, action) => {
      const timestamp = new Date()
      handleSaveOrder({
        ...action.payload,
        orderUserID: auth.currentUser.uid,
        orderCreatedDate: timestamp
      })
      // state.order = action.payload
    },
    setOrderDetails: (state, action) => {
      state.orderDetails = action.payload
    },
    getOrderDetails: (state, action) => {

    }
    
  
  }
})

export const {saveOrder, getUserOrderHistory, setUserOrderHistory, setOrderDetails} = orderSlice.actions
export const selectOrderHistory = state => state.order.orderHistory

export const selectUserOrderHistory = state => state.order.userOrderHistory
export const selectOrderDetails = state => state.order.orderDetails

export const asyncGetUserOrderHistory = uid => async dispatch => {
  try {
    const orderHistory = await handleGetUserOrderHistory(uid)
    dispatch(setUserOrderHistory(orderHistory))
  }
  catch(err) {
    console.log(err)
  }
}

export const asyncGetOrderDetails = orderId => async dispatch => {
  try {
    const order = await handleGetUserOrderDetails(orderId)
    dispatch(setOrderDetails(order))
  } catch (error) {
    
  }
  


}


export default orderSlice.reducer