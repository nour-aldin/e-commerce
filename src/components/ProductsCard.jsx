import React from "react";
import Button from "./forms/Button";

import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/products/productsSlice";

const ProductsCard = ({product}) => {
  const dispatch = useDispatch()

  const removeProduct = (documentId) => {
    dispatch(deleteProduct(documentId))
    console.log(documentId)
  } 
  return (
    <div className="w-[300px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a >
        <img
          className="rounded-t-lg w-[300px] h-[300px]"
          src={product.thumbnail}
          alt="product image"
        />
      </a>
      <div className="flex items-center justify-between m-2">
          <span className="text-sm font-bold text-gray-900 dark:text-white ">
            {product.category}
          </span>
        </div>
      <div className="px-5 pb-5 mx-auto">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mx-auto">
            {product.name}
          </h5>
        </a>
        
        
        <div className="flex items-center justify-between">
          <span className="text-3xl font-light text-gray-900 dark:text-white mx-auto">
            ${product.price}
          </span>
        </div>
        <Button onClick={() => removeProduct(product.documentId)}>Delete</Button>
      </div>
    </div>
  );
};

export default ProductsCard;
