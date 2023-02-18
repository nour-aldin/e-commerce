import { useState,useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { selectUser, logOut } from "../redux/user/userSlice";
import { selectProducts,fetchProducts } from "../redux/products/productsSlice";
import { checkUserIsAdmin } from "../Utils";


import userProfileImage from '../assets/user.png'
import Button from "../components/forms/Button";
import AddNewProduct from "../components/forms/AddNewProduct";
import { setModal } from "../redux/modal/modalSlice";
import ProductsCard from "../components/ProductsCard";

const Admin = () => {

  const [displayName, setDisplayName] = useState('')
  
  const user = useSelector(selectUser);
  const products = useSelector(selectProducts)
  const dispatch = useDispatch()

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts())
   console.log(products)
  },[])

  useEffect(() => {
    if (!checkUserIsAdmin(user)) {
      navigate("../login", { replace: true });
    } else {
      setDisplayName(user.displayName)
    }
  }, [user]);

  const handleSignOut = () => {
    dispatch(logOut())
  }

  const handleNewProduct = () => {
    dispatch(setModal(true))
  }

  const disableModal = () => {
    dispatch(setModal(false))
  }

  return (
    <div className="flex flex-row py-1 ">
      <div className="w-60 h-[655px] shadow-md bg-white px-1 ">
      <div className="w-full  p-5 shadow-md">
        <img className="w-20 my-0 mx-auto" src={userProfileImage} alt="ProfileImage"/>
        <h2 className="max-w-max my-5 mx-auto font-semibold text-xl uppercase ">{displayName}</h2>
      </div>
  <ul className="relative">
    <li className="relative">
      <Link to="/" className="flex items-center text-2xl font-extralight px-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap  hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out shadow-md rounded-sm" >Home</Link>
    </li>
    <li className="relative">
      <Link className="flex items-center text-2xl font-extralight px-2 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap  hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out shadow-md rounded-sm" onClick={handleSignOut} >Sign Out</Link>
    </li>
  </ul>
</div>
      <div>
        <Button onClick={handleNewProduct}>ADD NEW PRODUCT </Button>
        
        <AddNewProduct/>
        <div className="grid grid-cols-4 gap-4 justify-between p-5">
        {products&&products.map((product, index) => (
            <ProductsCard key={index} product={product} type="admin"/>
          ))}
        </div>
        
      </div>
      
    </div>
  );
};

export default Admin;
