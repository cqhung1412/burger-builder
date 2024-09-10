import React from 'react'
import IngredientSummary from './IngredientSummary/IngredientSummary'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
  return (
    <Auxiliary>
      <h3 style={{textAlign: 'center'}}>Your Burger Order</h3>
      <p>Your delicious burger contains these following ingredients</p>
      <IngredientSummary ingredients={props.ingredients}/>
      <p><strong>Total Price: {props.totalPrice}$</strong></p>
      <p>Proceed to Checkout?</p>
      <Button btnType='Success' onClick={props.onContinue}>CONTINUE</Button>
      <Button btnType='Danger' onClick={props.onCancel}>CANCEL</Button>
    </Auxiliary>
  )
}

export default orderSummary
