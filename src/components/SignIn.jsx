import React, { useState } from "react";
import Button from "./forms/Button";
import { signInWithGoogle, auth } from "../firbase/utils";
import FormInput from "./forms/FormInput";

const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handelFormSubmit = async e => {
    e.preventDefault();
    const {email, password} = user;

    try {
      auth.signInWithEmailAndPassword(email, password)
      setUser({
        email: '',
        password: ''
      })
    } catch(err) {
      console.log(err)
    }

  }

  return (
    <div className="border-2 border-black rounded-lg shadow-xl m-5 p-5 w-[40%] mx-auto">
      <h2 className="max-w-max mx-auto my-2 text-xl text-slate-800 font-semibold shadow-xl">
        Login
      </h2>
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
      <Button onClick={signInWithGoogle}>Sign in with Google</Button>
    </div>
  );
};

export default SignIn;
