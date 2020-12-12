import * as actionTypes from './actionTypes'

export const setup = payload => {
  return { type: actionTypes.SETUP, payload }
}

export const addIngredient = payload => {
  return { type: actionTypes.ADD_INGREDIENT, payload }
}

export const removeIngredient = payload => {
  return { type: actionTypes.REMOVE_INGREDIENT, payload }
}