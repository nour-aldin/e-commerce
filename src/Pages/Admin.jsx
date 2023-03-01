import { useState,useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { selectUser, logOut } from "../redux/user/userSlice";
import { selectProducts,fetchProducts, selectIsLastPage } from "../redux/products/productsSlice";
import { checkUserIsAdmin } from "../Utils";



import Button from "../components/forms/Button";
import AddNewProduct from "../components/forms/AddNewProduct";
import { setModal } from "../redux/modal/modalSlice";
import ProductsCard from "../components/ProductsCard";
import LoadMore from "../components/LoadMore";
import UserToolBar from "../components/UserToolBar";

const Admin = () => {

  
  
  const user = useSelector(selectUser);
  const products = useSelector(selectProducts)

  const dispatch = useDispatch()

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts())
  },[])

  useEffect(() => {
    if (!checkUserIsAdmin(user)) {
      navigate("../login", { replace: true });
    } 
  }, [user]);

  

  const handleNewProduct = () => {
    dispatch(setModal(true))
  }

  return (
    <div className="flex flex-row py-1 ">
      <UserToolBar />
      <div>
        <Button onClick={handleNewProduct}>ADD NEW PRODUCT </Button>
        
        
        <div className="grid grid-cols-4 gap-4 justify-between p-5">
        {products&&products.map((product, index) => (
            <ProductsCard key={index} product={product} type="admin"/>
          ))}
        </div>
        <LoadMore />
      </div>
      <AddNewProduct/>
    </div>
  );
};

export default Admin;
