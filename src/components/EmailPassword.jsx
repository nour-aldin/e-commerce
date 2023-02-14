import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import FormInput from './forms/FormInput'
import Button from './forms/Button'

import { auth } from '../firbase/utils'

const EmailPassword = () => {

  const [user, setUser] = useState({
    email: "",
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  let navigate = useNavigate();

  const handelFormSubmit = async e => {
    e.preventDefault();
    const {email} = user;

    try {
      const config = {
        url: 'http://localhost:5173/login'
      }

      await auth.sendPasswordResetEmail(email, config)
      .then(() => {
        navigate('/login')
      }) .catch(() => {
        const err = ['Email was not found please try again.']
        setErrors(err)
      })
    } catch(err) {
      // console.log(err)
    }

  }

  return (
    <div className="border-2 border-black rounded-lg shadow-xl m-5 p-5 w-[40%] mx-auto">
      <h2 className="max-w-max mx-auto my-2 text-xl text-slate-800 font-semibold shadow-xl">
        Email Password
      </h2>
      {errors.length > 0 && (
        <ul className="bg-gray-100  shadow-lg  my-0 mx-auto max-w-max">
          {errors.map((error, index) => (
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

        {/* <FormInput
          type="password"
          name="password"
          value={user.password}
          placeholder="Password"
          onChange={handleChange}
        /> */}
        <Button type="submit">Email Password</Button>
      </form>
    </div>
  )
}

export default EmailPassword