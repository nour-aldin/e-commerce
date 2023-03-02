import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInUser,
  selectSignInSuccess,
  signInWithGoogle,
  selectSignInError,
} from "../redux/user/userSlice";

import { Link, useNavigate } from "react-router-dom";

import Button from "./forms/Button";
import FormInput from "./forms/FormInput";

const SignIn = () => {
  const signInSuccess = useSelector(selectSignInSuccess);
  const signInError = useSelector(selectSignInError);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (signInSuccess == true) {
      setUser({
        email: "",
        password: "",
      });
      navigate("../", { replace: true });
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSigninWithGoogle = () => {
    dispatch(signInWithGoogle());
  };

  const handelFormSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser(user.email, user.password));
  };

  return (
    <div className="border-2  rounded-lg shadow-xl m-5 p-5 lg:w-[40%] mx-auto sm:w-full  lg:border-black sm:boder-0 lg:my-5 md:my-[300px] md:w-[80%] ">
      <h2 className="max-w-max mx-auto my-2 text-xl text-slate-800 font-semibold shadow-xl">
        Login
      </h2>
      {signInError.length > 0 && (
        <ul className="bg-gray-100  shadow-lg  my-0 mx-auto max-w-max">
          {signInError.map((error, index) => (
            <li key={index} className="m-5 font-bold text-red-600">
              {error}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handelFormSubmit}>
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
        <Button type="submit">Log in</Button>
      </form>
      <Button onClick={handleSigninWithGoogle}>Sign in with Google</Button>
      <div className="max-w-max mx-auto my-2">
        <Link
          className=" text-xl text-slate-800 font-semibold hover:text-blue-500"
          to="/recovery"
        >
          <span className="">Forget passowrd</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
