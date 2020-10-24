import React from 'react'
import IngredientSummary from '../Burger/OrderSummary/IngredientSummary/IngredientSummary'

import classes from './Order.css'

const Order = (props) => {
  return (
    <div className={classes.Order}>
      <p>Ingredients: </p>
      <IngredientSummary ingredients={props.ingredients} totalPrice={props.price}/>
      <p>Total Price: <strong>${props.price}</strong></p>
    </div>
  )
}

export default Order
