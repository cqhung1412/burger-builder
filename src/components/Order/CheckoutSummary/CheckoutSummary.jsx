import React from 'react'
import classes from './CheckoutSummary.css'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

const checkoutSummary = props => {
  return (
    <div className={classes.CheckouSummary}>
      <h3>It'll be delicious!</h3>
      <div style={{width:'100%', margin:'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button 
        btnType='Danger'
        onClick={props.onCancel}
      >CANCEL</Button>
      <Button 
        btnType='Success'
        onClick={props.onConfirm}
      >CONFIRM</Button>
    </div>
  )
}

export default checkoutSummary
