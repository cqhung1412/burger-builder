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
      .catch(err => dispatch(purchaseBurgerFailed(err)))
  }
}

export const initPurchase = () => {
  return {
    type: actionTypes.INIT_PURCHASE
  }
}