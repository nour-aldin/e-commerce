import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpUser,
  selectSignUpError,
  selectSignUpSuccess,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

import FormInput from "./forms/FormInput";
import Button from "./forms/Button";

const Signup = () => {
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const signUpError = useSelector(selectSignUpError);
  const signUpSuccess = useSelector(selectSignUpSuccess);

  useEffect(() => {
    console.log(signUpSuccess);
    if (signUpSuccess === true) {
      navigate("../", { replace: true });
    }
  }, [signUpSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handelFormSubmit = (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = user;
    dispatch(signUpUser(displayName, email, password, confirmPassword));
  };

  useEffect(() => {
    if (signUpSuccess) {
      setUser({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("../", { replace: true });
    }
  }, [signUpSuccess]);

  return (
    <div className="border-2  rounded-lg shadow-xl m-5 p-5 lg:w-[40%] mx-auto sm:w-full  lg:border-black sm:boder-0">
      <h2 className="max-w-max mx-auto my-2 text-xl text-slate-800 font-semibold shadow-xl">
        Signup
      </h2>

      {signUpError.length > 0 && (
        <ul className="bg-gray-100  shadow-lg w-[50%] my-0 mx-auto max-w-max">
          {signUpError.map((error, index) => (
            <li key={index} className="m-5 font-bold text-red-600">
              {error}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handelFormSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={user.displayName}
          placeholder="Full Name"
          onChange={handleChange}
        />
        <FormInput
          type="email"
          name="email"
          value={user.email}
          placeholder="Email"
          onChange={handleChange}
        />

        <FormInput
          type="password"
          name="password"
          value={user.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={user.confirmPassword}
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Signup;
