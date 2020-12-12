import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  ingredients: null,
  totalPrice: 0.0,
  ingredientPrice: null,
  error: false
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      console.log(payload)
      return {
        ...state
      }

    case actionTypes.PURCHASE_BURGER_FAILED:
      console.log(payload)
      return {
        ...state
      }

    default:
      return state
  }
}

export default reducer
