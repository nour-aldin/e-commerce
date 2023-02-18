import React from "react";
import Button from "./forms/Button";

import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/products/productsSlice";

const ProductsCard = ({product, type}) => {
  const dispatch = useDispatch()

  const removeProduct = (documentId) => {
    dispatch(deleteProduct(documentId))
    console.log(documentId)
  } 
  return (
    <div className="w-[300px] bg-white shadow-md rounded-lg  dark:bg-white ">
      <a >
        <img
          className="rounded-t-lg w-[300px] h-[300px]"
          src={product.thumbnail}
          alt="product image"
        />
      </a>
      {/* <div className="flex items-center justify-between m-2">
          <span className="text-sm font-bold text-gray-900 dark:text-black ">
            {product.category}
          </span>
        </div> */}
      <div className="px-3 pb-3 mx-auto">
        <a href="#">
          <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-black mx-auto text-center">
            {product.name}
          </h5>
        </a>
        
        
        <div className="flex items-center justify-between mt-1">
          <span className="text-3xl font-light text-gray-900 dark:text-black mx-auto">
            ${product.price}
          </span>
        </div>
        <div className="m-0">
        {type === 'admin' && (
          <Button onClick={() => removeProduct(product.documentId)}>Delete</Button>
        )}
        {
          type === 'user' && (
            <Button>Add To Cart</Button>
          )
        }
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
