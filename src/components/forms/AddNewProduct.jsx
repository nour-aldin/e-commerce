import React, { useState } from "react";

import { useDispatch,useSelector } from "react-redux";
import { addProduct } from "../../redux/products/productsSlice";

import { useNavigate } from "react-router-dom";

import Button from "./Button";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { selectModal, setModal } from "../../redux/modal/modalSlice";

const AddNewProduct = () => {

  const [product, setProduct] = useState({
    name: "",
    category: "mens",
    thumbnail: "",
    price: 0,
  });

  const [errors, setErrors] = useState([])
  const showModal = useSelector(selectModal)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const resetFrom = () => {
    setProduct({
      name: "",
      category: "",
      thumbnail: "",
      price: 0,
    });
    dispatch(setModal(false))
  }

  const handleSubmitForm = e => {
    e.preventDefault();
    if(!product.name || !product.category || !product.price || !product.thumbnail){
      setErrors(['please fill all the inputs'])
      return
    }
    dispatch(addProduct(product))
    resetFrom()  
      
  }

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-2 rounded w-[30%]">
      
        <h1 className="uppercase text-2xl font-thin mx-5 mt-2">Add new product</h1>
        {errors.length > 0 && (
        <ul className="bg-gray-100  shadow-lg w-[50%] my-0 mx-auto max-w-max">
          {errors.map((error, index) => (
            <li key={index} className="m-5 font-bold text-red-600">
              {error}
            </li>
          ))}
        </ul>
      )}
        <form onSubmit={handleSubmitForm}>
          <FormSelect
            options={[
              {
                value: "mens",
                name: "Mens",
              },
              {
                value: "womens",
                name: "Womens",
              },
            ]}
            onChange={handleChange}
            label="Category"
            name="category"
            require="true"
          />
          <FormInput
            type="text"
            label="Name"
            value={product.name}
            onChange={handleChange}
            name="name"
          />
          <FormInput
            label="Main image URL"
            type="url"
            value={product.thumbnail}
            onChange={handleChange}
            name="thumbnail"
          />
          <FormInput
            label="Price"
            type="number"
            min="0.00"
            max="10000.00"
            step="0.01"
            value={product.price}            
            onChange={handleChange}
            name="price"
          />
        <Button type="submit">ADD PRODUCT</Button>
        <Button onClick={close}>Close</Button>
        </form>
        
      </div>
    </div>
  );
};

export default AddNewProduct;
