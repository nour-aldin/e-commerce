import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const OrderHistory = ({ order }) => {

  const [date, setDate] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const timestamp = new Date(order.orderCreatedDate.seconds * 1000);

    const formatedDate = moment(timestamp).format("DD/MM/YYYY");
  
    setDate(formatedDate);
  }, []);

  const handleNavigate = ID => {
    navigate(`/order/${ID}`)
  }
  return (
    <tbody className="rounded-lg text-center haver: cursor-pointer" onClick={() => handleNavigate(order.documentId)}>
      <tr className="hover:bg-slate-100 border-b ">
        
        <td className="px-6 py-4 text-black text-center">{date}</td>
        <td className="px-6 py-4 text-black">{order.documentId}</td>
        <td className="px-6 py-4 text-black"> ${order.orderTotal}</td>
      </tr>
    
    </tbody>
  );
};

export default OrderHistory;
