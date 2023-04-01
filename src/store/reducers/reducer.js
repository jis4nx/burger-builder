import { createSlice } from "@reduxjs/toolkit";
import { INGREDIENT_PRICES } from "../../components/BurgerBuilder/data/index";
import { countItem } from "../../components/BurgerBuilder/Order/Checkout";

const initState = {
  ingredients: [],
  totalPrice: 0,
  isPurchaseAble: false,
  ORDER_SUMMARY: [],
  orders: [],
  netErr: "",
};

const burgerBuildSlice = createSlice({
  name: "burgerBuild",
  initialState: initState,
  reducers: {
    addIngredient: (state, action) => {
      state.ingredients.push({ type: action.payload });
      state.totalPrice += INGREDIENT_PRICES[action.payload];
    },
    removeIngredient: (state, action) => {
      let rev = state.ingredients.reverse();
      let IndexofIngredient = state.ingredients.findIndex(
        (item) => item.type === action.payload
      );
      if (IndexofIngredient !== -1) {
        rev.splice(IndexofIngredient, 1);
        state.totalPrice -= INGREDIENT_PRICES[action.payload];
        state.ingredients = rev.reverse()
      } else {
        state.ingredients = rev.reverse();
      }
    },
    updatePurchaseAble: (state) => {
      state.totalPrice > 0
        ? (state.isPurchaseAble = true)
        : (state.isPurchaseAble = false);
    },
    resetBurger: (state) => {
      return initState;
    },
    loadOrders: (state, action) => {
      state.orders = [...action.payload];
    },
    setErr: (state, action) => {
      state.netErr = action.payload;
    },
    orderSummary: (state, action) => {
      for (var x in action.payload) {
        if (
          !state.ORDER_SUMMARY.some(
            (item) => item.item === action.payload[x].type
          )
        ) {
          state.ORDER_SUMMARY.push(
            countItem(action.payload, action.payload[x].type)
          );
        }
      }
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  updatePurchaseAble,
  resetBurger,
  loadOrders,
  orderSummary,
  setErr,
} = burgerBuildSlice.actions;
export default burgerBuildSlice.reducer;
