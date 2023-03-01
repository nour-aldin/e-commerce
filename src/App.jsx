import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "./redux/user/userSlice";

import Header from "./components/Header";
import AdminToolbar from "./components/AdminToolbar";

import HomePage from "./Pages/HomePage";
import RegisterationPage from "./Pages/RegisterationPage";
import Login from "./Pages/LogIn";
import Recovery from "./Pages/recovery";
import Admin from "./Pages/Admin"
import Search from "./Pages/Search";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";

import { auth, handleUserProfile } from "./firbase/utils";

import "./index.css";
import Payment from "./Pages/Payment";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const authListner = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          dispatch(setUser({ id: snapshot.id, ...snapshot.data() }));
        });
      }
      dispatch(setUser(null));
    });

    return () => {
      authListner();
    };
  }, []);
  return (
    <div className="App">
      <AdminToolbar />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route
          path="/register"
          element={
            !user ? <RegisterationPage /> : <Navigate replace to={"/"} />
          }
        /> */}
        {/* <Route
          path="/login"
          element={!user ? <Login /> : <Navigate replace to={"/"} />}
        /> */}
        <Route path="/register" element={<RegisterationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/admin" element={<Admin />}/>
        <Route path="/search" element={<Search />}/>
        <Route path="/search/:filterType" element={<Search />}/>
        <Route path="/product/:productID" element={<ProductDetails />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/payment" element={<Payment />}/>
      </Routes>
    </div>
  );
}

export default App;
