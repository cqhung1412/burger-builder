import React from 'react'
import classes from './Button.css'

const button = (props) => {
  return (
    <button
      type={props.type}
      className={[classes.Button, classes[props.btnType]].join(' ')}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default button
