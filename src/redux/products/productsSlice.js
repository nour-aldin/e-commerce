import { createSlice } from "@reduxjs/toolkit";

import { handleAddProduct, auth,firestore } from "../../firbase/utils";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    newProduct: null,
    products: []
  },
  reducers: {
    addProduct: (state, action) => {
      console.log("STORE HH", action.payload)
      handleAddProduct({
        ...action.payload,
        productAdminUserId: auth.currentUser.uid
      })
      state.newProduct = action.payload
      state.products.push(action.payload)
    },
    getProducts: state => {
      fetchProducts()
    },
    setProducts: (state, action) => {
      state.products = action.payload
    }
  },
})

export const selectProducts = state => state.products.products

export const {addProduct,getProducts,setProducts} = productsSlice.actions

export const fetchProducts = (filterType="") => async dispatch => {
  console.log(filterType)
  return new Promise((resolve, reject) => {
    let ref = firestore.collection('products')
    if(filterType) {
      console.log("men or women")
      ref = ref.where('category', "==", filterType)
    }
    
    
    
    ref.get()
    .then(snapshot => {
      const productsArray = snapshot.docs.map(doc => {
        return {
          ...doc.data(),
          documentId: doc.id
        }
      })
      
      dispatch(setProducts(productsArray))
      resolve()
    })
    .catch(err => {
      reject(err)
    })
  })
}

export const deleteProduct = (productId) => async dispatch => {
  try {
    await firestore.collection('products')
    .doc(productId)
    .delete()
    dispatch(fetchProducts(productId))
  }
  catch(err) {
    console.log(err)
  }
}


export default productsSlice.reducer