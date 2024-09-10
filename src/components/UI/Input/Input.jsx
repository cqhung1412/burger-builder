import React from 'react'

import classes from './Input.css'

const Input = (props) => {
  const { eType, eConfig, value, validation, onChange } = props
  const { id, type, options, label } = eConfig
  let inputElement = null
  const inputAttributes = {
    className: classes.InputElement,
    name: id,
    id,
    type,
    value,
    required: validation ? validation.required : false,
    pattern: validation ? validation.pattern : '',
    onChange
  }

  switch (eType) {
    case ('input'):
      inputElement = <input {...inputAttributes} />
      break
    case ('textarea'):
      inputElement = <textarea {...inputAttributes} rows='5' />
      break
    case ('select'):
      inputElement = (
        <select {...inputAttributes} > {
          options.map((opt, index) =>
            <option key={index} value={opt.value}>
              {opt.displayValue}
            </option>
          )
        } </select>
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