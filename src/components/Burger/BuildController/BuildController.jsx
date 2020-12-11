import React from 'react'
import classes from './BuildController.css'

const BuildElement = props => {
  const { label, amount, price, onLess, onMore } = props
  return (
    <div className={classes.BuildElement}>
      <div className={classes.Label}>{label}</div>
      <button
        className={classes.Less}
        onClick={onLess}
        disabled={amount === 0}
      >Less</button>
      <div className={classes.Amount}>{amount}</div>
      <button
        className={classes.More}
        onClick={onMore}
        disabled={amount >= 5}
      >More</button>
      <div className={classes.Label}>{price}$</div>
    </div>
  )
}

const buildController = props => {
  const { onLess, onMore, onOrder, ingredients, totalPrice, ingredientPrice } = props

  const purchasable = ingredients.length > 1;
  // ingsObj = { 'bacon': 1, 'cheese': 3, 'meat': 0, 'salad': 2 }
  const ingsObj = ingredients.reduce((prev, curr) => {
    prev[curr] = (prev[curr] || 0) + 1
    return prev
  }, { 'bacon': 0, 'cheese': 0, 'meat': 0, 'salad': 0 })

  const controls = Object.entries(ingredientPrice) // = [['bacon', 0.3], ['cheese', 0.5],...]

  return (
    <div className={classes.BuildController}>
      <p>Total Price: <strong>{+totalPrice.toFixed(2)}$</strong></p>
      {controls.map(control => (
        <BuildElement
          key={control[0]}
          label={control[0]}
          price={control[1]}
          amount={ingsObj[control[0]]}
          onLess={() => onLess(control[0])}
          onMore={() => onMore(control[0])}
        />
      ))}
      <button disabled={!purchasable} className={classes.OrderButton} onClick={onOrder}>ORDER NOW</button>
    </div>
  )
}

export default buildController
