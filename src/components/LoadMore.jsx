import React from "react";
import Button from "./forms/Button";
import { useDispatch, useSelector } from "react-redux";

import {
  selectProducts,
  fetchProducts,
  selectQueryDoc,
  selectIsLastPage,
} from "../redux/products/productsSlice";
const LoadMore = ({ filterType }) => {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const queryDoc = useSelector(selectQueryDoc);
  const isLastPage = useSelector(selectIsLastPage);

  const handleLoadMore = () => {
    dispatch(fetchProducts(filterType, queryDoc, products));
  };
  if (isLastPage) return null;

  return <Button onClick={() => handleLoadMore()}>Load More</Button>;
};

export default LoadMore;
