import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectProducts, fetchProducts } from "../redux/products/productsSlice";

import ProductsCard from "../components/ProductsCard";
import FormSelect from "../components/forms/FormSelect";
import Footer from "../components/Footer";
import LoadMore from "../components/LoadMore";

const Search = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const navigate = useNavigate();
  const { filterType } = useParams();

  useEffect(() => {
    dispatch(fetchProducts(filterType));
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
    const nextFilter = e.target.value;
    navigate(`/search/${nextFilter}`, { replace: true });
  };

  return (
    <div className="lg:ml-[10rem] lg:mr-[6rem] sm: mx-10">
      <h1 className="my-5 font-sans text-2xl uppercase">Browse Products</h1>
      <div className="w-[10rem]">
        <FormSelect {...configFilters} onChange={handleFilter} />
      </div>
      <div className="grid justify-between xl:grid-cols-4 lg:gap-4 md:grid-cols-2 md:gap-4  ">
        {products &&
          products.map((product, index) => (
            <div key={index} className="lg:flex lg:flex-row lg:flex-wrap">
              <div className="lg:flex-[50%]">
                <ProductsCard product={product} type="user" />
              </div>
            </div>
          ))}
      </div>
      <LoadMore filterType={filterType}/>
      <Footer />
    </div>
  );
};

export default Search;
