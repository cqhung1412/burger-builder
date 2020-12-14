import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import axios from '../../axios-instance'
import * as actionCreators from '../../store/actions/index'

import Order from '../../components/Order/Order'
import Button from '../../components/UI/Button/Button'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
  componentDidMount() { this.props.onFetchOrders() }

  render() {
    const { orders, orderKeys, loading } = this.props
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
          loading ? <Spinner /> :
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
              orders.map((order, index) => <Order key={index} orderKey={orderKeys[index]} ingredients={order.ingredients} price={order.price} />)
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    orderKeys: state.order.orderKeys,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actionCreators.initFetchOrders())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))