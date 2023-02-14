import React from "react";

const Button = ({ children, ...otherProps }) => {
  return (
    <div className="m-5">
      <button
        className="rounded-lg block w-full p-2.5 shadow-xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium  text-sm dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        {...otherProps}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
