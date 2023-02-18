import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  getProducts,
  fetchProducts,
} from "../redux/products/productsSlice";

import ProductsCard from "../components/ProductsCard";
import FormSelect from "../components/forms/FormSelect";
import Footer  from "../components/Footer";

const Search = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const navigate = useNavigate()
  const {filterType} = useParams()

  useEffect(() => {
    dispatch(fetchProducts(filterType));
    console.log("hhh");
  }, [filterType]);

  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: "Show all",
        value: "",
      },
      {
        name: "Mens",
        value: "mens",
      },
      {
        name: "Womens",
        value: "womens",
      },
    ],
  };

  const handleFilter = (e) => {
    const nextFilter = e.target.value
    navigate(`/search/${nextFilter}`, {replace: true})

  };

  return (
    <div className="ml-[10rem] mr-[6rem]">
      <h1 className="my-5 font-sans text-2xl uppercase">Browse Products</h1>
      <div className="w-[10rem] relative right-5">
      <FormSelect {...configFilters} onChange={handleFilter}/>
      </div>
      <div className="grid grid-cols-4 gap-4 justify-between">
        {products &&
          products.map((product, index) => (
            <div key={index} className="flex flex-row flex-wrap">
              <div className="flex-[25%]">
                <ProductsCard product={product} type="user" />
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default Search;
