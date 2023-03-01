import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { selectUser, logOut } from "../redux/user/userSlice";
import {
  asyncGetUserOrderHistory,
  selectUserOrderHistory,
} from "../redux/orders/orderSlice";
import userProfileImage from "../assets/user.png";
import OrderHistory from "../components/OrderHistory";
import UserToolBar from "../components/UserToolBar";

const Dashoboard = () => {
  const [displayName, setDisplayName] = useState("");

  const user = useSelector(selectUser);
  const userOrderHistory = useSelector(selectUserOrderHistory);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(asyncGetUserOrderHistory(user.id));
      setDisplayName(user.displayName);
    } else {
      setDisplayName("Guest");
     
    }
  }, [user]);

  const handleSignOut = () => {
    dispatch(logOut());
  };

  return (
    <div className="flex flex-row py-1">
      <UserToolBar />
      <div className="mx-5 w-full">
        <table className=" mx-auto my-5 rounded-lg text-sm text-center text-gray-500 shadow-2xl w-full">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-black">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Date
              </th>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Quantity
              </th> */}
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
            </tr>
          </thead>
          {userOrderHistory &&
          userOrderHistory.map((order, index) => (
            <OrderHistory key={index} order={order} />
          ))}
        </table>
        
      </div>
    </div>
  );
};

export default Dashoboard;
