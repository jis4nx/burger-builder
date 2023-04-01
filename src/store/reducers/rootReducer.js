import { combineReducers } from "redux";
import * as actionTypes from "../actions/actionType";
import { INGREDIENT_PRICES } from "../../components/BurgerBuilder/data/index";
import store from "../index.js";

const priceReducer = (state = INGREDIENT_PRICES, action) => {
  return state;
};

const initState = {
  ingredients: [],
  totalPrice: 0,
  isPurchaseAble: false,
};

const burgerBuildReducer = (state = initState, action) => {
  let ingredientsArr = [...state.ingredients];
  let total = state.totalPrice;

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: {
      ingredientsArr.push({ type: action.payload });
      total += INGREDIENT_PRICES[action.payload];
      return {
        ...state,
        totalPrice: total,
        ingredients: ingredientsArr,
      };
    }

    case actionTypes.REMOVE_INGREDIENT: {
      let rev = ingredientsArr.reverse();
      let IndexofIngredient = rev.findIndex(
        (item) => item.type === action.payload
      );
      if (IndexofIngredient != -1) {
        ingredientsArr.splice(IndexofIngredient, 1);
        total = state.totalPrice - INGREDIENT_PRICES[action.payload];
        return {
          ...state,
          ingredients: rev.reverse(),
          totalPrice: total,
        };
      }else{
        return{
          ...state,
          ingredients: rev.reverse(),
          totalPrice: total
        }
      }
    }

    case actionTypes.RESET_BURGER: {
      return initState;
    }

    case actionTypes.UPDATE_PURCHASEABLE: {
      return {
        ...state,
        isPurchaseAble: total > 0,
      };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  price: priceReducer,
  burgerBuild: burgerBuildReducer,
});

export default rootReducer;
