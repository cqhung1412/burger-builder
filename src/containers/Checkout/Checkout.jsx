import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import classes from './Checkout.css'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import axios from '../../axios-instance'
import * as actionCreators from '../../store/actions/index'

class Checkout extends Component {
  checkoutCancelHandler = () => {
    this.props.history.goBack()
  }

  checkoutConfirmHandler = () => {
    this.props.history.replace('/checkout/contact')
  }

  render() {
    const { ingredients, purchased } = this.props
    let summary = <Redirect to='/' />
    const purchasedRedirect = purchased && <Redirect to='/' />
    if (ingredients) {
      summary = (
        <div className={classes.CheckoutContainer}>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={ingredients}
            onCancel={this.checkoutCancelHandler}
            onConfirm={this.checkoutConfirmHandler}
          />
          <Route
            path={this.props.match.path + '/contact'}
            component={ContactData}
          />
        </div>
      )
    }
    return summary
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.builder.ingredients,
    totalPrice: state.builder.totalPrice,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(withErrorHandler(Checkout, axios))