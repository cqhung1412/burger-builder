import React, { Component } from 'react'

import axios from '../../axios-orders'

import IngredientSummary from '../Burger/OrderSummary/IngredientSummary/IngredientSummary'
import Button from '../UI/Button/Button'

import classes from './Order.css'

class Order extends Component {
  deleteOrderHandler = () => {
    axios.delete('/orders.json', this.props.orderKey)
      .then(() => {

      })
  }

  render() {
    const { ingredients, price } = this.props
    return (
      <div className={classes.Order}>
        <p>Ingredients: </p>
        <IngredientSummary ingredients={ingredients} totalPrice={price} />
        <p>Total Price: <strong>{Number(price).toFixed(2)}$</strong></p>
        <Button
          btnType='Danger'
          onClick={this.deleteOrderHandler}
        >
          DELETE
        </Button>
      </div>
    )
  }
}

export default Order
