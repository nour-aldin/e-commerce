import React, { useState } from "react";

import { auth, handleUserProfile } from "../firbase/utils";

import FormInput from "./forms/FormInput";
import Button from "./forms/Button";

const Signup = () => {
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handelFormSubmit = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = user;

    if (password !== confirmPassword) {
      const error = ["Password does not mached"];
      setErrors(error);
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await handleUserProfile(user, { displayName });

      setUser({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {}
  };

  return (
    <div className="border-2 border-black rounded-lg shadow-xl m-5 p-5 w-[40%] mx-auto">
      <h2 className="max-w-max mx-auto my-2 text-xl text-slate-800 font-semibold shadow-xl">
        {" "}
        Signup
      </h2>

      {errors.length > 0 && (
        <ul className="bg-gray-100  shadow-lg w-[50%] my-0 mx-auto max-w-max">
          {errors.map((error, index) => (
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
