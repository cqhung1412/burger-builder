import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
  const ingsArr = props.ingredients.reduce((prev, curr) => {
    prev[curr] = (prev[curr] || 0) + 1
    return prev
  }, { 'bacon': 0, 'cheese': 0, 'meat': 0, 'salad': 0 })

  const ingredientSummary = (
    <ul>
      {
        Object.keys(ingsArr)
        .filter(ing => ingsArr[ing] !== 0)
        .map(ing => 
          <li key={ing}><strong style={{textTransform: 'capitalize'}}>{ing}</strong>: {ingsArr[ing]}</li>
        )
      }
    </ul>
  )

  return (
    <Auxiliary>
      <h3 style={{textAlign: 'center'}}>Your Burger Order</h3>
      <p>Your delicious burger contains these following ingredients</p>
      {ingredientSummary}
      <strong>Total Price: {props.totalPrice.toFixed(2)}</strong>
      <p>Proceed to Checkout?</p>
      <Button btnType='Success' onClick={props.onContinue}>CONTINUE</Button>
      <Button btnType='Danger' onClick={props.onCancel}>CANCEL</Button>
    </Auxiliary>
  )
}

export default orderSummary
