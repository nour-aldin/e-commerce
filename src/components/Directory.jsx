import React from "react";
import { Link } from "react-router-dom";
import shopMen from '../assets/shopMens.jpg';
import shopWomen from "../assets/shopWomens.jpg";




const Directory = () => {
  return (
    <div className="flex flex-row mt-2 h-[10%] lg:w-[80%] mx-auto sm:w-[100%]">
      <div className="w-[50%] relative h-[575px] after:content-[''] after:absolute after:top-0 after:left-0 after:bg-[rgba(0,0,0,0.3)] after:w-full after:h-full z-10">
          <img src={shopMen} alt="shopMen" className="w-[100%] h-[575px]" />
          <Link to='search/mens' className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] z-20 lg:text-3xl sm:text-4xl uppercase py-[8px] px-[10px] border border-black bg-white hover:cursor-pointer ">Shop Mens</Link>
      </div>
      <div className="w-[50%] relative h-[575px] after:content-[''] after:absolute after:top-0 after:left-0 after:bg-[rgba(0,0,0,0.3)] after:w-full after:h-full z-10">
        <img src={shopWomen} className="w-[100%] h-[575px]"/>
        <Link to='search/womens' className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] z-20 lg:text-3xl sm:text-4xl uppercase py-[8px] px-[10px] border border-black bg-white hover:cursor-pointer">Show Womens</Link>
      </div>
    </div>
  )
}

export default Directory