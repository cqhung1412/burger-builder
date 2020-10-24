import React, { Component } from 'react'

import axios from '../../axios-orders'
import Order from '../../components/Order/Order'
import Button from '../../components/UI/Button/Button'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
  state = {
    orders: [],
    loading: false
  }

  componentDidMount() {
    this.setState({ loading: true })

    axios.get('/orders.json')
      .then(res => {
        const ordersArr = Object.values(res.data)
        this.setState({ orders: ordersArr, loading: false })
      })
      .catch(err => {
        console.log(err)
        this.setState({ orders: [], loading: false })
      })
  }

  render() {
    const { orders } = this.state
    return (
      <div>
        {
          orders.length === 0
            ?
            <div
              style={ {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0 1.5rem'
              } }
            >
              <h3>You have not ordered yet!</h3>
              <Button
                btnType='Success'
                onClick={() => { this.props.history.push('/builder') }}
              >ORDER NOW</Button>
            </div>
            :
            orders.map((order, index) => <Order key={index} ingredients={order.ingredients} price={order.price} />)
        }
      </div>
    )
  }
}

export default withErrorHandler(Orders, axios)