import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

import axios from '../../axios-instance'

class Checkout extends Component {
  checkoutCancelHandler = () => {
    this.props.history.goBack()
  }

  checkoutConfirmHandler = () => {
    this.props.history.replace('/checkout/contact')
  }

  render() {
    const { ingredients } = this.props
    return (
      <Auxiliary>
        <CheckoutSummary 
          ingredients={ingredients}
          onCancel={this.checkoutCancelHandler}
          onConfirm={this.checkoutConfirmHandler}
        />
        <Route 
          path={this.props.match.path + '/contact'} 
          render={(props) => (<ContactData {...props} />)}
        />
      </Auxiliary>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.builder.ingredients,
    totalPrice: state.builder.totalPrice
  } 
}

export default connect(mapStateToProps)(withErrorHandler(Checkout, axios))