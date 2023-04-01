import * as actionTypes from './actionType'


export const addIngredient = ingredientType =>{
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: ingredientType
  }
}

export const removeIngredient = (ingredientType) =>{
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: ingredientType
  }
}
