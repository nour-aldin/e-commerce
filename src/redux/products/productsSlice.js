import { createSlice } from "@reduxjs/toolkit";

import { handleAddProduct, auth, firestore, handleFetchProduct } from "../../firbase/utils";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    newProduct: null,
    products: [],
    product: {},
    queryDoc: null,
    isLastPage: false,
  },
  reducers: {
    addProduct: (state, action) => {
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
      state.products = action.payload.data
      state.queryDoc = action.payload.queryDoc
      state.isLastPage = action.payload.isLastPage

    },
    setProduct: (state, action) => {
      state.product = action.payload
    }
  },
})

export const selectProducts = state => state.products.products
export const selectProduct = state => state.products.product
export const selectQueryDoc = state => state.products.queryDoc
export const selectIsLastPage = state => state.products.isLastPage

export const {addProduct,getProducts,setProducts,setProduct} = productsSlice.actions

export const fetchProducts = (filterType="", startAfterDoc, persistProducts=[]) => async dispatch => {

  return new Promise((resolve, reject) => {
    const pageSize = 8

    let ref = firestore.collection('products').limit(pageSize)

    if(filterType) ref = ref.where('category', "==", filterType)
    if(startAfterDoc) ref = ref.startAfter(startAfterDoc)
    
    ref.get()
    .then(snapshot => {
      const totalCount = snapshot.size
      const data = [
        ...persistProducts,
        ...snapshot.docs.map(doc => {
          return {
            ...doc.data(),
            documentId: doc.id
          }
        })
      ]
      const queryDoc = snapshot.docs[totalCount - 1]
      const isLastPage = totalCount < 1
      dispatch(setProducts({data: data, queryDoc: queryDoc, isLastPage: isLastPage}))
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

export const fetchProduct = productID => async dispatch => {
  try {
    const product = await handleFetchProduct(productID)
    dispatch(setProduct(product))
  }
  catch (err) {
    console.log(err)
  }
}


export default productsSlice.reducer