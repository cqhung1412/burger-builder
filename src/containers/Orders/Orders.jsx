import React, { Component } from 'react'

import axios from '../../axios-orders'
import Order from '../../components/Order/Order'

export default class Orders extends Component {
  state = {
    orders: [],
    loading: false
  }

  componentDidMount() {
    this.setState({ loading: true })

    axios.get('/orders.json')
      .then(res => {
        const ordersArr = Object.values(res.data)
        console.log(ordersArr)
        this.setState({ orders: ordersArr, loading: false })
      })
      .catch(err => {
        console.log(err)
        this.setState({ loading: false })
      })
  }

  render() {
    return (
      <div>
        {
          this.state.orders.map((order, index) => <Order key={index} ingredients={order.ingredients} price={order.price} />)
        }
      </div>
    )
  }
}
