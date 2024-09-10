import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

import axios from '../../../axios-instance'
import classes from './ContactData.css'
import * as actionCreators from '../../../store/actions/index'

const inputConfig = (label, id, validation = {}, type = 'text', eType = 'input', options = null, value = '') => {
  return {
    eType,
    eConfig: {
      id,
      type,
      label,
      options
    },
    value,
    validation
  }
}

class ContactData extends Component {
  state = {
    orderForm: {
      name: inputConfig('Your Name', 'name', {
        required: true
      }),
      email: inputConfig('Your Email', 'email', {}, 'email'),
      phone: inputConfig('Your Number', 'phone', {
        required: true,
        pattern: '.{10,}'
      }, 'tel'),
      address: inputConfig('Street Address', 'address', {
        required: true,
        pattern: '.{8,}'
      }),
      zipCode: inputConfig('Zip Code', 'zipCode'),
      deliveryMethod: inputConfig('Delivery Method', 'deliveryMethod', null, null, 'select', [
        { value: 'cheapest', displayValue: 'Cheapest' },
        { value: 'fastest', displayValue: 'Fastest' }
      ], 'cheapest')
    }
  }

  inputChangedHandler = (e, targetId) => {
    e.preventDefault()
    const updatedOrderForm = { ...this.state.orderForm }
    const updatedElement = {
      ...updatedOrderForm[targetId],
      value: e.target.value
    }
    updatedOrderForm[targetId] = updatedElement
    this.setState({ orderForm: { ...updatedOrderForm } })
  }

  orderHandler = (event) => {
    event.preventDefault()

    const { ingredients, totalPrice } = this.props
    const orderData = { ...this.state.orderForm }
    for (let e in orderData) {
      orderData[e] = orderData[e].value
    }
    const { name, email, address, phone, zipCode, deliveryMethod } = orderData

    const order = {
      ingredients: ingredients,
      price: totalPrice,
      customer: {
        name,
        email,
        address,
        phone,
        zipCode
      },
      deliveryMethod
    }
    this.props.onOrderSubmit(order)
  }

  render() {
    const { orderForm } = this.state
    const orderFormArr = Object.values(orderForm)
    let form = (
      <form onSubmit={this.orderHandler}>
        {orderFormArr.map((e, index) => <Input
          key={index}
          {...e}
          onChange={(event) => this.inputChangedHandler(event, e.eConfig.id)}
        />)}
        <Button btnType='Success' type='submit'>ORDER</Button>
      </form>
    )
    if (this.props.loading)
      form = <Spinner />

    return (
      <div className={classes.ContactData}>
        <h3>Enter your Contact Data</h3>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.builder.ingredients,
    totalPrice: state.builder.totalPrice,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderSubmit: (orderData) => dispatch(actionCreators.tryPurchaseBurger(orderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))