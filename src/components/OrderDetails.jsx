import React from "react";

const OrderDetails = ({ order }) => {
  return (
    <tbody className="rounded-lg">
    <tr className="bg-white border-b ">
   
      <td className=" py-3  text-black"> <img className="w-[100px] h-[100px] mx-auto" src={order.thumbnail} /></td>
      <td className="px-6 py-4 text-black">{order.name}</td>
      <td className="px-6 py-4 text-black">${order.price}</td>
      <td className="px-6 py-4 text-black">{order.quantity}</td>
      <td className="px-6 py-4 text-black">${order.price * order.quantity}</td>
    </tr>
  </tbody>
  );
};

export default OrderDetails;
