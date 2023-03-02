import React from "react";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  addToCart,
  reduceCartItem,
} from "../redux/cart/cartSlice";

const Item = ({ item }) => {
  const dispatch = useDispatch();
  const handleAddProduct = (product) => {
    dispatch(addToCart(product));
  };

  const handleReduceProduct = (product) => {
    dispatch(reduceCartItem(product));
  };

  return (
    <tbody className="rounded-lg">
      <tr className="bg-white border-b ">
        <th
          scope="row"
          className="px-2 py-2 font-medium text-black whitespace-nowrap "
        >
          <img className="w-[50%]" src={item.thumbnail} />
        </th>
        <td className="px-6 py-4 text-black">{item.name}</td>
        <td className="px-6 py-4 text-black text-xl">
          <span
            onClick={() => handleReduceProduct(item)}
            className="hover: cursor-pointer"
          >
            &#60;
          </span>{" "}
          {item.quantity}{" "}
          <span
            onClick={() => handleAddProduct(item)}
            className="hover: cursor-pointer"
          >
            &#62;
          </span>
        </td>
        <td className="px-6 py-4 text-black">{item.category}</td>
        <td className="px-6 py-4 text-black">${item.price}</td>
        <td className="px-6 py-4 text-black">
          <span
            className="text-xl hover: cursor-pointer"
            onClick={() => dispatch(removeCartItem(item))}
          >
            X
          </span>
        </td>
      </tr>
    </tbody>
  );
};

export default Item;
