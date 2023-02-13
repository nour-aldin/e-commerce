import React from "react";
import shopMen from '../assets/shopMens.jpg';
import shopWomen from "../assets/shopWomens.jpg";


const Directory = () => {
  return (
    <div className="flex flex-row mt-2 h-[10%]">
      <div className="w-[50%] relative h-[655px] after:content-[''] after:absolute after:top-0 after:left-0 after:bg-[rgba(0,0,0,0.3)] after:w-full after:h-full z-10">
          <img src={shopMen} alt="shopMen" className="w-[100%] h-[655px]" />
          <a className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] z-20 text-3xl uppercase py-[8px] px-[10px] border border-black bg-white hover:cursor-pointer">Shop Mens</a>
      </div>
      <div className="w-[50%] relative h-[655px] after:content-[''] after:absolute after:top-0 after:left-0 after:bg-[rgba(0,0,0,0.3)] after:w-full after:h-full z-10">
        <img src={shopWomen} className="w-[100%] h-[655px]"/>
        <a className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] z-20 text-3xl uppercase py-[8px] px-[10px] border border-black bg-white hover:cursor-pointer">Show Womens</a>
      </div>
    </div>
  )
}

export default Directory