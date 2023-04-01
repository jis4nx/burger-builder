import React from "react";
import Ingredient from "../Ingredient/Ingredient";
import "../burger.css";
const Burger = (props) => {
  let ingredientArr = props.ingredients
    .map((item) => {
      let amountArr = [...Array(item.amount).keys()];
      return amountArr.map((_) => {
        return <Ingredient type={item.type} key={Math.random()} />;
      });
    })
    .flat();

  if (ingredientArr.length === 0) {
    ingredientArr = (
      <div style={{ lineHeight: "2ch" }}>
        <p>You're gonna eat just breads,</p>
        <p>or want to add some ingredients?</p>
      </div>
    );
  }

  return (
    <div className="burger">
      <Ingredient type="bread-top" />
      {ingredientArr}
      <Ingredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
