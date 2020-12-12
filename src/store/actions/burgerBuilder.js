import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(res => Object.values(res.data)) // = { 1:"bacon", 2:"cheese",... }
      .then(ingredients => {
        axios.get('/price.json')
          .then(res => res.data) // = { bacon: 0.30, cheese: 0.50,... }
          .then(ingredientPrice => dispatch({
            type: actionTypes.INIT_INGREDIENTS,
            payload: { ingredients, ingredientPrice }
          }))
          .catch(err => dispatch(fetchIngredientsFailed()))
      })
      .catch(err => dispatch(fetchIngredientsFailed()))
  }
}

export const addIngredient = payload => {
  return { type: actionTypes.ADD_INGREDIENT, payload }
}

export const removeIngredient = payload => {
  return { type: actionTypes.REMOVE_INGREDIENT, payload }
}