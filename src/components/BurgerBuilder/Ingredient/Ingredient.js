import React from "react";
import '../burger.css'

import BreadTop from "../../../assets/images/top.png";
import BreadBottom from "../../../assets/images/bottom.png";
import Meat from "../../../assets/images/meat.png";
import Cheese from "../../../assets/images/cheese.png";
import Salad from "../../../assets/images/salad.png";

const Ingredient = props => {
  let ingredient = null;
  switch (props.type) {
    case 'bread-top':
        ingredient = <div><img src={BreadTop} alt='Bread Top'/></div>
        break;
    case "bread-meat":
        ingredient = <div><img src={Meat} alt="Top Bread"/></div>;
        break;
    case "bread-cheese":
        ingredient = <div><img src={Cheese} alt="Top Bread"/></div>;
        break;
    case "bread-salad":
        ingredient = <div><img src={Salad} alt="Top Bread"/></div>;
        break;
    case "bread-bottom":
        ingredient = <div><img src={BreadBottom} alt="Top Bread"/></div>;
        break;    
    default:
        break;
  }

  return <div className="ingredient">{ingredient}</div>;
};

export default Ingredient
