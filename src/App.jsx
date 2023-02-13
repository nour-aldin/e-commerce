import Header from "./components/Header"
import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import RegisterationPage from "./Pages/RegisterationPage"
import Login from "./Pages/LogIn"

import './index.css'

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/register' element={<RegisterationPage />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
      
    </div>
  )
}

export default App
