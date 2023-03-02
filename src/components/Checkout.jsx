import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../redux/cart/cartSlice";

import Item from "./Item";
const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotal);

  return (
    <div className="relative overflow-x-auto ">
      <h2 className="max-w-max mx-auto my-5 text-3xl text-slate-800 font-semibold uppercase">
        Checkout
      </h2>
      {cartItems.length == 0 && (
        <>
          <p className="max-w-max mx-auto my-40 text-xl text-slate-800 shadow-lg ">
            You have no items in your cart
          </p>
        </>
      )}
      {cartItems.length > 0 && (
        <>
          <table className="w-[50%] mx-auto my-5 rounded-lg text-sm text-center text-gray-500 shadow-2xl">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-black">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Remove
                </th>
              </tr>
            </thead>
            {cartItems.map((item, index) => {
              return <Item key={index} item={item} />;
            })}
          </table>
          <div className="text-lg font-semibold text-black w-[450px] mx-auto mb-5 uppercase">
            <h2 className="shadow-lg inline ">Total: {totalPrice}</h2>
            <div className="inline-flex space-x-11 w-full mt-5 ">
              <button
                onClick={() => navigate(-1)}
                className="uppercase rounded-lg w-full p-2.5 shadow-xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium  text-sm dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Continue shopping
              </button>
              <button
                onClick={() => navigate("/payment")}
                className="uppercase rounded-lg  w-full p-2.5 shadow-xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium  text-sm dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 "
              >
                checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
