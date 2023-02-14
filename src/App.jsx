import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./Pages/HomePage";
import RegisterationPage from "./Pages/RegisterationPage";
import Login from "./Pages/LogIn";
import Recovery from "./Pages/recovery";


import { auth, handleUserProfile } from "./firbase/utils";

import "./index.css";

function App() {
  const [user, setUser] = useState(null);

  let authListner = null;
  useEffect(() => {
    authListner = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot( snapshot => {
          setUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      }
      setUser(null);
    });
  },[]);
  return (
    <div className="App">
      <Header currentUser={user} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/register" 
          element={!user ? <RegisterationPage /> : <Navigate replace to ={"/"} />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate replace to={"/"} />}
        />
        <Route path="/recovery" element={<Recovery />} />
      </Routes>
    </div>
  );
}

export default App;
