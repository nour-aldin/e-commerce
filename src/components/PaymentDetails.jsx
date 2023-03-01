import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FormInput from "./forms/FormInput";
import Button from "./forms/Button";

import { CountryDropdown } from "react-country-region-selector";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { apiInstance } from "../Utils";

import { useSelector, useDispatch } from "react-redux";
import {selectCartTotal, clearCart, selectTotalNumCartItems} from '../redux/cart/cartSlice'


const initialAddressState = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
};

const PaymentDetails = () => {
  const navigate = useNavigate()
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()
  const total = useSelector(selectCartTotal)
  const totalItems = useSelector(selectTotalNumCartItems)
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [recipientName, setRecipientName] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  useEffect(() => {
    if(totalItems < 1) {
      navigate('/')
    }
  },[totalItems])

  const handleShipping = (evt) => {
    const { name, value } = evt.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBilling = (evt) => {
    const { name, value } = evt.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cardElement = elements.getElement('card')
    if (
      !shippingAddress.line1 || !shippingAddress.city ||
      !shippingAddress.state || !shippingAddress.postal_code ||
      !shippingAddress.country || !billingAddress.line1 ||
      !billingAddress.city || !billingAddress.state ||
      !billingAddress.postal_code || !billingAddress.country ||
      !recipientName || !nameOnCard
    ) {
      return;
    }
    apiInstance.defaults.headers.common['Content-Type'] = "application/json"
    apiInstance.post('payment/create', {
      amount: total * 100,
      shipping: {
        name: recipientName,
        address: {
          ...shippingAddress
        }
      }

    }) .then(({data: clientSecret}) => {
      stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: nameOnCard,
          address: {
            ...billingAddress
          }
        }
      }) .then(({paymentMethod}) => {

        stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id
        })
        .then(({ paymentIntent }) => {
          dispatch(clearCart())
        })
      })
    })

  };

  const configCardElement = {
    iconStyle: 'solid',
    style: {
      base: {
        fontSize: '16px',
      }
    },
    hidePostalCode: true
  } 

  return (
    <div className="mt-5 md:w-[50%] md:mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="">
          <h2 className="mx-5 text-2xl uppercase font-light shadow-lg inline bg-gray-100">
            Shipping
          </h2>
          <FormInput
            required
            placeholder="Recipient Name"
            name="recipientName"
            handleChange={(evt) => setRecipientName(evt.target.value)}
            value={recipientName}
            type="text"
          />

          <FormInput
            required
            placeholder="Line 1"
            name="line1"
            handleChange={(evt) => handleShipping(evt)}
            value={shippingAddress.line1}
            type="text"
          />

          <FormInput
            placeholder="Line 2"
            name="line2"
            handleChange={(evt) => handleShipping(evt)}
            value={shippingAddress.line2}
            type="text"
          />

          <FormInput
            required
            placeholder="City"
            name="city"
            handleChange={(evt) => handleShipping(evt)}
            value={shippingAddress.city}
            type="text"
          />

          <FormInput
            required
            placeholder="State"
            name="state"
            handleChange={(evt) => handleShipping(evt)}
            value={shippingAddress.state}
            type="text"
          />

          <FormInput
            required
            placeholder="Postal Code"
            name="postal_code"
            handleChange={(evt) => handleShipping(evt)}
            value={shippingAddress.postal_code}
            type="text"
          />
          <div className="m-5 ">
            <CountryDropdown
              onChange={(val) =>
                handleShipping({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              valueType="short"
              classes="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white  shadow-xl md:w-full xx"
              value={shippingAddress.country}
            />
          </div>
        </div>

        <div className="">
          <h2 className="mx-5 text-2xl uppercase font-light shadow-lg inline bg-gray-100">
            Billing
          </h2>
          <FormInput
            required
            placeholder="Name on Card"
            name="recipientName"
            handleChange={(evt) => setNameOnCard(evt.target.value)}
            value={nameOnCard}
            type="text"
          />

          <FormInput
            required
            placeholder="Line 1"
            name="line1"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.line1}
            type="text"
          />

          <FormInput
            placeholder="Line 2"
            name="line2"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.line2}
            type="text"
          />

          <FormInput
            required
            placeholder="City"
            name="city"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.city}
            type="text"
          />

          <FormInput
            required
            placeholder="State"
            name="state"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.state}
            type="text"
          />

          <FormInput
            required
            placeholder="Postal Code"
            name="postal_code"
            handleChange={(evt) => handleBilling(evt)}
            value={billingAddress.postal_code}
            type="text"
          />
          <div className="m-5 ">
            <CountryDropdown
              onChange={(val) =>
                handleBilling({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              value={billingAddress.country}
              valueType="short"
              classes="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-[20px] p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white  shadow-xl md:w-full xx"
            />
          </div>
        </div>

        <div className="">
          <h2 className="mx-5 text-2xl uppercase font-light shadow-lg inline bg-gray-100">
            Card Details
          </h2>
          <div className="m-5">
          <CardElement 
            options={configCardElement}
          />
          </div>
        </div>
        <Button type='submit'>Pay Now</Button>
      </form>
    </div>
  );
};

export default PaymentDetails;