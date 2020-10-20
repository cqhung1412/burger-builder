import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

import axios from '../../axios-orders'

class Checkout extends Component {
  state = {
    ingredients: null
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.ingredients) {
      const ingredients = []
      const query = new URLSearchParams(nextProps.location.search)
      
      for (let param of query.entries()) {
        ingredients.push(param[0])
      }

      return { ingredients: ingredients } // ings: ['salad', 'cheese', 'bacon', 'meat']
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
        <Route path={this.props.match.path + '/contact'} component={ContactData}/>
      </Auxiliary>
    )
  }
}

export default withErrorHandler(Checkout, axios)