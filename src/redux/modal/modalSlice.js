import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    showModal: false
  },
  reducers:{
    setModal: (state, action) => {
      state.showModal = action.payload;
    }
  }
})

export const {setModal} = modalSlice.actions

export const selectModal = state => state.modal.showModal

export default modalSlice.reducer