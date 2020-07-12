import React from 'react'
import classes from './BuildController.css'

const BuildElement = props => {
  return (
    <div className={classes.BuildElement}>
      <div className={classes.Label}>{props.label}</div>
      <button className={classes.Less} onClick={props.onLess}>Less</button>
      <div className={classes.Label}>{props.amount}</div>
      <button className={classes.More} onClick={props.onMore}>More</button>
    </div>
  )
}

const controls = [
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
  { label: 'Salad', type: 'salad' },
]

const buildController = props => {
  const { onLess, onMore, ingredients } = props

  const ingsArr = ingredients.reduce((prev, curr) => {
    prev[curr] = (prev[curr] || 0) + 1
    return prev
  }, { 'bacon': 0, 'cheese': 0, 'meat': 0, 'salad': 0 })

  const amountArr = Object.values(ingsArr)

  return (
    <div className={classes.BuildController}>
      {controls.map((control, index) => (
        <BuildElement 
          key={control.label} 
          label={control.label}
          amount={amountArr[index]}
          onLess={() => onLess(control.type)}
          onMore={() => onMore(control.type)}
        />
      ))}
    </div>
  )
}

export default buildController
