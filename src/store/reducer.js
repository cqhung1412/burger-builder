import * as actionTypes from './actions'

const initialState = {
  ingredients: [],
  totalPrice: 0.0
}

const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, payload.ingredient],
        totalPrice: state.totalPrice + payload.price
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
        totalPrice: state.totalPrice - payload.price
      }

    default:
      return state
  }
}

export default reducer
