import React, { useEffect } from "react";

import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import {
  asyncGetOrderDetails,
  selectOrderDetails,
  setOrderDetails,
} from "../redux/orders/orderSlice";
import UserToolBar from "../components/UserToolBar";
import OrderDetails from "../components/OrderDetails";

const Order = () => {
  const { orderID } = useParams();
  const dispatch = useDispatch();
  const orderDetails = useSelector(selectOrderDetails);
  const { orderTotal, orderItems } = orderDetails;
  useEffect(() => {
    dispatch(asyncGetOrderDetails(orderID));
    return () => {
      dispatch(setOrderDetails({}))
    }
  }, []);

  return (
    <div className="flex flex-row py-1 ">
    
      <UserToolBar />
      <div className="mx-5 w-full">
      <h1 className="max-w-max  my-5 text-3xl text-slate-800 font-light uppercase">Order ID: #{orderID}</h1>
        <table className=" w-full mx-auto my-5 rounded-lg text-sm text-center text-gray-500 shadow-2xl">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-black">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                total
              </th>
            </tr>
          </thead>
          { orderItems &&orderItems.map((order, index)=>(
            <OrderDetails key={index} order={order}/>
          ))}
        </table>
        <div className="text-lg font-semibold text-black w-[450px]  mb-5 uppercase">
        <h2 className="shadow-lg inline ">Total: {orderTotal}</h2>
        </div>
      </div>

      
    </div>
  );
};

export default Order;
