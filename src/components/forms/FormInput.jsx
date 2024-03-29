import React from 'react'

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className='m-5'>
      {label && (
        <label>
          {label}
        </label>
      )}

      <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-xl md:w-full' onChange={ handleChange } { ...otherProps }/>
    </div>
  )
}

export default FormInput