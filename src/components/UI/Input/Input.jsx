import React, { Fragment } from 'react'

import classes from './Input.css'

const Input = (props) => {
  const { eType, eConfig, value, onChange } = props
  const { id, type, options, label } = eConfig
  let inputElement = null
  const inputAttributes = {
    className: classes.InputElement,
    name: id,
    id,
    type,
    value,
    onChange
  }

  switch (eType) {
    case ('input'):
      inputElement = <input {...inputAttributes} />
      break
    case ('textarea'):
      inputElement = <textarea {...inputAttributes} />
      break
    case ('select'):
      inputElement = (
        <Fragment>
          <select {...inputAttributes} > {
            options.map((opt, index) =>
              <option key={index} value={opt.value}>
                {opt.displayValue}
              </option>
            )
          } </select>
        </Fragment>
      )
      break
    default:
      inputElement = <input {...inputAttributes} />
  }

  return (
    <div className={classes.Input}>
      <label
        className={classes.Label}
        htmlFor={id}
      >
        {label}
      </label>
      {inputElement}
    </div>
  )
}

export default Input