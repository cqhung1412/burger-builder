import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'

import axios from '../../../axios-orders'
import classes from './ContactData.css'

export default class ContactData extends Component {
  state = {
    name: 'Quốc Hùng',
    phone: '0903074655',
    address: {
      street: '23 PVD',
      ward: 'HBC',
      district: 'TD',
      city: 'HCM'
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
      deliveryMethod: 'express'
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
        <input className={classes.Input} type='text' name='tel' placeholder='Your Phone Number' />
        <input className={classes.Input} type='text' name='name' placeholder='Your Name' />
        <input className={classes.Input} type='text' name='street' placeholder='Street' />
        <input className={classes.Input} type='text' name='ward' placeholder='Ward' />
        <input className={classes.Input} type='text' name='district' placeholder='District' />
        <input className={classes.Input} type='text' name='city' placeholder='City' />
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
