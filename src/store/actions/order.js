import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'

export const purchaseBurgerSuccess = payload => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    payload
  }
}

export const purchaseBurgerFailed = payload => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    payload
  }
}

export const tryPurchaseBurger = orderData => {
  return dispatch => {
    dispatch({ type: actionTypes.TRY_PURCHASE_BURGER })
    axios.post('/orders.json', orderData)
      .then(res => dispatch(purchaseBurgerSuccess({ orderId: res.data.name, orderData })))
      .catch(error => dispatch(purchaseBurgerFailed({ error })))
  }
}

export const initPurchase = () => {
  return {
    type: actionTypes.INIT_PURCHASE
  }
}

export const fetchOrdersSuccess = payload => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload
  }
}

export const fetchOrdersFailed = payload => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    payload
  }
}

export const initFetchOrders = () => {
  return dispatch => {
    dispatch({ type: actionTypes.INIT_FETCH_ORDERS })
    axios.get('/orders.json')
      .then(res => dispatch(fetchOrdersSuccess({ orderData: res.data })))
      .catch(error => dispatch(fetchOrdersFailed({ error })))
  }
}