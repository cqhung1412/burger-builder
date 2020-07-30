import React from 'react'
import classes from './BuildController.css'

const BuildElement = props => {
  return (
    <div className={classes.BuildElement}>
      <div className={classes.Label}>{props.label}</div>
      <button 
        className={classes.Less} 
        onClick={props.onLess}
        disabled={props.amount === 0}
      >Less</button>
      <div className={classes.Label}>{props.amount}</div>
      <button className={classes.More} onClick={props.onMore}>More</button>
    </div>
  )
}

const controls = [
  { type: 'bacon', price: 0.3 },
  { type: 'cheese', price: 0.5 },
  { type: 'meat', price: 0.99 },
  { type: 'salad', price: 0.45 },
]

const buildController = props => {
  const { onLess, onMore, onOrder, ingredients, price, purchasable } = props

  const ingsArr = ingredients.reduce((prev, curr) => {
    prev[curr] = (prev[curr] || 0) + 1
    return prev
  }, { 'bacon': 0, 'cheese': 0, 'meat': 0, 'salad': 0 })

  const amountArr = Object.values(ingsArr)

  return (
    <div className={classes.BuildController}>
      <p>Total Price: <strong>{price.toFixed(2)}</strong></p>
      {controls.map((control, index) => (
        <BuildElement 
          key={control.type} 
          label={control.type}
          amount={amountArr[index]}
          onLess={() => onLess(control.type, control.price)}
          onMore={() => onMore(control.type, control.price)}
        />
      ))}
      <button disabled={!purchasable} className={classes.OrderButton} onClick={onOrder}>ORDER NOW</button>
    </div>
  )
}

export default buildController
