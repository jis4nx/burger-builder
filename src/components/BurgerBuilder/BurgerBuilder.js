import React, { Component } from "react";
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";
import Checkout from "./Order/Checkout";
import { Routes, Route } from "react-router-dom";
import { connect, useSelector } from "react-redux";

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  isPurchaseAble: state.burgerBuilder.isPurchaseAble,
  uid: state.user.userId
});


const BurgerComponent = () => {
  const mapingredients = useSelector(
    (state) => state.burgerBuilder.ingredients
  );
  return (
    <div>
      <Burger ingredients={mapingredients} />
    </div>
  );
};

class BurgerBuilder extends Component {
  state = {};
  render() {
    return (
      <div className="d-flex flex-md-row flex-column">
        <BurgerComponent />
        <div style={{ flexBasis: "40%", alignItems: "flex-start" }}>
          <Routes>
            <Route
              path="*"
              element={
                this.props.uid?
                <Controls
                  totalPrice={this.props.totalPrice}
                  purchaseable={this.props.isPurchaseAble}
                />:null
              }
            />
            <Route
              path="/checkout"
              element={
                <Checkout
                  ingredients={this.props.ingredients}
                  price={this.props.totalPrice}
                  totalPrice={this.props.totalPrice}
                />
              }
            ></Route>
          </Routes>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(BurgerBuilder);
// export default BurgerBuilder;
