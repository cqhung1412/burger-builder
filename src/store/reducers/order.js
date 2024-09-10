import * as actionTypes from '../actions/actionTypes'

const initialState = {
  orderKeys: [],
  orders: [],
  loading: false,
  purchased: false
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.INIT_PURCHASE:
      return {
        ...state,
        purchased: false
      }

    case actionTypes.TRY_PURCHASE_BURGER:
      return {
        ...state,
        loading: true
      }

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      console.log(payload)
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: [...state.orders, payload.orderData],
        orderKeys: [...state.orderKeys, payload.orderId]
      }

    case actionTypes.PURCHASE_BURGER_FAILED:
      console.log(payload)
      return {
        ...state,
        loading: false
      }

    case actionTypes.INIT_FETCH_ORDERS:
      return {
        ...state,
        loading: true
      }

    case actionTypes.FETCH_ORDERS_SUCCESS:
      console.log(payload)
      return {
        ...state,
        orders: [...Object.values(payload.orderData)],
        orderKeys: [...Object.keys(payload.orderData)],
        loading: false
      }

    case actionTypes.FETCH_ORDERS_FAILED:
      console.log(payload)
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}

export default reducer
