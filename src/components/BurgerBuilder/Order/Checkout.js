import React from "react";
import {
  Card,
  CardFooter,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { INGREDIENT_PRICES } from "../data/index";
import PlaceOrder from "../Order/PlaceOrder";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { orderSummary } from "../../../store/reducers/reducer";

export function countItem(arr, element) {
  let count = 0;
  for (var item of arr) {
    if (item.type === element) {
      count++;
    }
  }
  return { item: arguments[1], count: count };
}

const Checkout = (props) => {
  const dispatch = useDispatch();

  const { ingredients, totalPrice } = useSelector(
    (state) => state.burgerBuilder
  );

  const Summary = useSelector((state) => state.burgerBuilder.ORDER_SUMMARY);

  const LABELS = {
    "bread-meat": "Meat",
    "bread-salad": "Salad",
    "bread-cheese": "Cheese",
  };

  let ingredientsArr = props.ingredients;
  React.useEffect(() => {
    dispatch(orderSummary(ingredientsArr));
  });

  const SUMMARY = Summary.map((item) => {
    return (
      <ListGroupItem key={Math.random()}>
        <p className="text-primary">
          {LABELS[item.item]}{" "}
          <span className="font-weight-bold font-italic">x{item.count}</span> ={" "}
          {item.count * INGREDIENT_PRICES[item.item]} BDT.
        </p>
      </ListGroupItem>
    );
  });
  return (
    <div className="d-flex flex-column">
      <Card>
        <CardHeader className="h4 text-center">Order Summary</CardHeader>
        <ListGroup style={{ fontSize: "1.4rem" }}>{SUMMARY}</ListGroup>
        <CardFooter>
          <p className="text-danger h4">
            Total Price: {props.totalPrice} BDT.{" "}
          </p>
        </CardFooter>
      </Card>

      <Link
        to="/checkout/placeOrder"
        style={{ alignSelf: "center" }}
        className="p-4"
      >
        <button type="button" className="btn btn-primary btn-lg">
          Proceed To Order
        </button>
      </Link>
    </div>
  );
};
export default Checkout;
