import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
  ingredients: null,
  totalPrice: 0.0,
  ingredientPrice: null,
  error: false
}

const addIngredient = (state, payload) => {
  const updatedPrice = +state.totalPrice + state.ingredientPrice[payload.ingredient]
  const updatedValues = {
    ingredients: [...state.ingredients, payload.ingredient],
    totalPrice: Number(updatedPrice).toFixed(2)
  }
  return updateObject(state, updatedValues)
}

const removeIngredient = (state, payload) => {
  let updatedIngredients = [...state.ingredients]
  // remove the bottom ingredient
  for (let i = updatedIngredients.length - 1; i >= 0; i--) {
    if (updatedIngredients[i] === payload.ingredient) {
      updatedIngredients.splice(i, 1)
      break
    }
  }
  const updatedPrice = +state.totalPrice - state.ingredientPrice[payload.ingredient]
  const updatedValues = {
    ingredients: [...updatedIngredients],
    totalPrice: Number(updatedPrice).toFixed(2)
  }
  return updateObject(state, updatedValues)
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      }
    case actionTypes.INIT_INGREDIENTS:
      console.log(payload)
      return {
        ...state,
        ingredients: [...payload.ingredients],
        ingredientPrice: { ...payload.ingredientPrice },
        totalPrice: 1.49,
        error: false
      }

    case actionTypes.ADD_INGREDIENT : return addIngredient(state, payload)

    case actionTypes.REMOVE_INGREDIENT : return removeIngredient(state, payload)

    default:
      return state
  }
}

export default reducer
