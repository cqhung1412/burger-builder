import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

import axios from '../../axios-orders'

class Checkout extends Component {
  state = {
    ingredients: null,
    price: null
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.ingredients) {
      const ingredients = []
      let price = 0.0
      const query = new URLSearchParams(nextProps.location.search)
      
      for (let param of query.entries()) {
        if (param[0] === 'price') {
          price = param[1]
        }
        else {
          ingredients.push(param[0])
        }
      }

      return { 
        ingredients: ingredients,
        price: price
      } // ings: ['salad', 'cheese', 'bacon', 'meat']
    }
    return null
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack()
  }

  checkoutConfirmHandler = () => {
    this.props.history.replace('/checkout/contact')
  }

  render() {
    return (
      <Auxiliary>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          onCancel={this.checkoutCancelHandler}
          onConfirm={this.checkoutConfirmHandler}
        />
        <Route 
          path={this.props.match.path + '/contact'} 
          render={() => (<ContactData ingredients={this.state.ingredients} price={this.state.price} />)}
        />
      </Auxiliary>
    )
  }
}

export default withErrorHandler(Checkout, axios)