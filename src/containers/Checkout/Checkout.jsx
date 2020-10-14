import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

export default class Checkout extends Component {
  state = {
    ingredients: ['salad', 'cheese', 'bacon', 'meat']
  }
  
  checkoutCancelHandler = () => {
    this.props.history.goBack()
  }

  checkoutConfirmHandler = () => {
    this.props.history.replace('/checkout/contact')
  }

  render() {
    return (
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          onCancel={this.checkoutCancelHandler}
          onConfirm={this.checkoutConfirmHandler}
        />
      </div>
    )
  }
}
