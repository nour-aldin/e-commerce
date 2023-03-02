import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProduct,
  selectProduct,
  setProduct,
} from "../redux/products/productsSlice";

import { addToCart } from "../redux/cart/cartSlice";

import Button from "../components/forms/Button";
import Footer from "../components/Footer";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productID } = useParams();
  const product = useSelector(selectProduct);

  useEffect(() => {
    dispatch(fetchProduct(productID));

    return function cleanup() {
      dispatch(setProduct({}));
    };
  }, []);

  const handleAddToCart = (product) => {
    if (!product) return;

    dispatch(addToCart(product));
  };

  if (!product) return null;

  return (
    <div>
    <div className="w-[30%]  bg-white shadow-xl border-black rounded-lg  dark:bg-white mx-auto mt-10 ">
      <Link to={`/product/${productID}`}>
        <img
          className="rounded-t-lg w-[100%] h-[380px]"
          src={product.thumbnail}
          alt="product image"
        />
      </Link>
      <div className="px-3 pb-3 mx-auto">
        <Link to={`/product/${productID}`}>
          <h5 className="text-lg font-light text-gray-900 dark:text-black mx-auto text-center">
            {product.name}
          </h5>
        </Link>

        <div className="flex items-center justify-between mt-1">
          <span className="text-3xl font-light text-gray-900 dark:text-black mx-auto">
            ${product.price}
          </span>
        </div>
        <div>
          <Button onClick={() => handleAddToCart(product)}>Add To Cart</Button>
        </div>
      </div>
      
    </div>
    <Footer />
    </div>
  );
};

export default ProductDetails;
