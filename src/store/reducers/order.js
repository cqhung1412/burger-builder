import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  orders: [],
  loading: false
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      console.log(payload)
      return {
        ...state,
        loading: false,
        orders: [...state.orders, payload.data]
      }

    case actionTypes.PURCHASE_BURGER_FAILED:
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
