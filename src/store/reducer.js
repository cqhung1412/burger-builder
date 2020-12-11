import * as actionTypes from './actions'

const initialState = {
  ingredients: [],
  totalPrice: 0.0,
  ingredientPrice: {}
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.SETUP:
      return {
        ...state,
        ingredients: [...payload.ingredients],
        ingredientPrice: {...payload.ingredientPrice},
        totalPrice: 3.73
      }

    case actionTypes.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, payload.ingredient],
        totalPrice: state.totalPrice + state.ingredientPrice[payload.ingredient]
      }

    case actionTypes.REMOVE_INGREDIENTS:
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
