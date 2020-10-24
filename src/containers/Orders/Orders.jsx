import React, { Component, Fragment } from 'react'

import axios from '../../axios-orders'
import Order from '../../components/Order/Order'
import Button from '../../components/UI/Button/Button'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
  state = {
    orderKeys: [],
    orders: [],
    loading: false
  }

  componentDidMount() {
    this.setState({ loading: true })

    axios.get('/orders.json')
      .then(res => {
        const keysArr = Object.keys(res.data)
        const ordersArr = Object.values(res.data)
        this.setState({ orderKeys: keysArr, orders: ordersArr, loading: false })
      })
      .catch(err => {
        console.log(err)
        this.setState({ orderKeys: [], orders: [], loading: false })
      })
  }

  render() {
    const { orders, orderKeys } = this.state
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 1.5rem'
        }}
      >
        {
          orders.length === 0
            ?
            <Fragment>
              <h3>You have not ordered yet!</h3>
              <Button
                btnType='Success'
                onClick={() => { this.props.history.push('/builder') }}
              >ORDER NOW</Button>
            </Fragment>
            :
            orders.map((order, index) => <Order key={orderKeys[index]} ingredients={order.ingredients} price={order.price} />)
        }
      </div>
    )
  }
}

export default withErrorHandler(Orders, axios)