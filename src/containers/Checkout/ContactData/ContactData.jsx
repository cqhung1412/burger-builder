import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

import axios from '../../../axios-orders'
import classes from './ContactData.css'

const htmlConfig = (placeholder = '', type = 'text', eType = 'input') => {
  return {
    elementType: eType,
    elementConfig: {
      type: type,
      placeholder: placeholder
    },
    value: ''
  }
}

export default class ContactData extends Component {
  state = {
    orderForm: {
      name: htmlConfig('Your Name'),
      email: htmlConfig('Your Email', 'email'),
      phone: htmlConfig('Your Number', 'tel'),
      address: htmlConfig('Street Address'),
      zipCode: htmlConfig('Zip Code')
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault()

    const { name, phone, address } = this.state
    const { ingredients, price } = this.props

    this.setState({ loading: true })

    const order = {
      ingredients: ingredients,
      price: price,
      customer: {
        name: name,
        address: address,
        phone: phone
      },
      deliveryMethod: 'freeship'
    }
    axios.post('/orders.json', order)
      .then(res => {
        console.log(res)
        this.setState({
          loading: false
        })
        this.props.history.push('/')
      })
      .catch(err => {
        console.log(err)
        this.setState({
          loading: false
        })
      })
  }

  render() {
    let form = (
      <form onSubmit={this.orderHandler}>
        <Input inputtype='input' type='text' name='name' placeholder='Name' />
        <Input inputtype='input' type='email' name='email' placeholder='Email' />
        <Input inputtype='input' type='tel' name='tel' placeholder='Phone Number' />
        <Input inputtype='input' type='text' name='street' placeholder='Street Address' />
        <Input inputtype='input' type='text' name='postal' placeholder='Postal Code' />
        <Button btnType='Success' type='submit'>ORDER</Button>
      </form>
    )
    if (this.state.loading)
      form = <Spinner />

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}
