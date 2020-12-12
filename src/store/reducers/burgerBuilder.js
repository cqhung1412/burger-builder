import * as actionTypes from '../actions/actionTypes'

const initialState = {
  ingredients: null,
  totalPrice: 0.0,
  ingredientPrice: null
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.SETUP:
      return {
        ...state,
        ingredients: [...payload.ingredients],
        ingredientPrice: {...payload.ingredientPrice},
        totalPrice: 1.49
      }

    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, payload.ingredient],
        totalPrice: state.totalPrice + state.ingredientPrice[payload.ingredient]
      }

    case actionTypes.REMOVE_INGREDIENT:
      let updatedIngredients = [...state.ingredients]
      // remove the bottom ingredient
      for (let i = updatedIngredients.length - 1; i >= 0; i--) {
        if (updatedIngredients[i] === payload.ingredient) {
          updatedIngredients.splice(i, 1)
          break
        }
      }
      return {
        ...state,
        ingredients: [...updatedIngredients],
        totalPrice: state.totalPrice - state.ingredientPrice[payload.ingredient]
      }

    default:
      return state
  }
}

export default reducer