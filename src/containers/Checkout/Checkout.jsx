import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

export default class Checkout extends Component {
  state = {
    ingredients: ['salad', 'cheese', 'bacon', 'meat']
  }
  
  render() {
    return (
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
        />
      </div>
    )
  }
}
