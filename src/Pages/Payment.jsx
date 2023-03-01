import React, {useEffect} from "react";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/userSlice";

import PaymentDetails from "../components/PaymentDetails";

import { Elements } from "@stripe/react-stripe-js";
import { key } from "../stripe/config";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(key)

const Payment = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("../login", { replace: true });
    } 
  }, [user]);
  return (
    <Elements stripe={stripePromise}>
      <PaymentDetails />
    </Elements>
  );
};

export default Payment;
