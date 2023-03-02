import React, {useEffect} from "react";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/userSlice";

import PaymentDetails from "../components/PaymentDetails";

import { Elements } from "@stripe/react-stripe-js";
import { key } from "../stripe/config";
import { loadStripe } from "@stripe/stripe-js";
import Footer from "../components/Footer";

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
    <div>
    <Elements stripe={stripePromise}>
      <PaymentDetails />
    </Elements>
    <Footer />
    </div>
  );
};

export default Payment;
