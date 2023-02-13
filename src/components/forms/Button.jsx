import React from 'react'

const Button = ({children, ...otherProps}) => {
  return (
    <button className='' {...otherProps}>
      {children}
    </button>
  )
}

export default Button