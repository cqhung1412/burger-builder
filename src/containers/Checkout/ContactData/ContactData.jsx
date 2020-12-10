import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

import axios from '../../../axios-orders'
import classes from './ContactData.css'

const inputConfig = (label, id, type = 'text', eType = 'input', options = null, value = '') => {
  return {
    eType,
    eConfig: {
      id,
      type,
      label,
      options
    },
    value
  }
}

export default class ContactData extends Component {
  state = {
    orderForm: {
      name: inputConfig('Your Name', 'name'),
      email: inputConfig('Your Email', 'email', 'email'),
      phone: inputConfig('Your Number', 'phone', 'tel'),
      address: inputConfig('Street Address', 'address'),
      zipCode: inputConfig('Zip Code', 'zipCode'),
      deliveryMethod: inputConfig('Delivery Method', 'deliveryMethod', null, 'select', [
        { value: 'cheapest', displayValue: 'Cheapest' },
        { value: 'fastest', displayValue: 'Fastest' }
      ], 'cheapest')
    },
    loading: false
  }

  inputChangedHandler = (e, targetId) => {
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

    const { ingredients, price } = this.props
    const orderData = { ...this.state.orderForm }
    for (let e in orderData) {
      orderData[e] = orderData[e].value
    }
    const { name, email, address, phone, zipCode, deliveryMethod } = orderData

    this.setState({ loading: true })
    const order = {
      ingredients: ingredients,
      price: price,
      customer: {
        name,
        email,
        address,
        phone,
        zipCode
      },
      deliveryMethod
    }
    axios.post('/orders.json', order)
      .then(res => {
        console.log(res)
        this.setState({ loading: false })
        this.props.history.push('/')
      })
      .catch(err => {
        console.log(err)
        this.setState({ loading: false })
      })
  }

  render() {
    const { orderForm } = this.state
    const orderFormArr = Object.values(orderForm)
    let form = (
      <form onSubmit={this.orderHandler}>
        {orderFormArr.map(e => <Input
          key={e.eConfig.id}
          {...e}
          onChange={(event) => this.inputChangedHandler(event, e.eConfig.id)}
        />)}
        <Button btnType='Success' type='submit'>ORDER</Button>
      </form>
    )
    if (this.state.loading)
      form = <Spinner />

    return (
      <div className={classes.ContactData}>
        <h3>Enter your Contact Data</h3>
        {form}
      </div>
    )
  }
}
