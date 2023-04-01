import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import {addIngredient, removeIngredient, updatePurchaseAble, resetBurger} from '../../../store/reducers/reducer'
import{useSelector, useDispatch} from 'react-redux'

const controls = [
  { label: "Meat", type: "bread-meat" },
  { label: "Cheese", type: "bread-cheese" },
  { label: "Salad", type: "bread-salad" },
];


const BuildControl = (props) => {
  return (
    <div className="d-flex my-3" style={{ fontSize: "1.3rem" }}>
      <p className="mr-auto">{props.label}</p>
      <button
        className="btn btn-outline-danger"
        onClick={props.removed}
        style={{ padding: "10px 15px", fontWeight: "bold" }}
      >
        -
      </button>
      <button
        className="btn btn-outline-info"
        onClick={props.added}
        style={{ padding: "10px 15px", marginLeft: "5px" }}
      >
        +
      </button>
    </div>
  );
};

const Controls = (props) => {
  const dispatch = useDispatch()

  const addItem = (type)=> {
    dispatch(addIngredient(type))
    dispatch(updatePurchaseAble())
  }

  const removeItem = (type)=> {
    dispatch(removeIngredient(type))
    dispatch(updatePurchaseAble())
  }

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <Card
        style={{ marginTop: "30px", marginBottom: "20px", textAlign: "center" }}
      >
        <CardHeader
          style={{
            backgroundColor: "#C41E3A",
            color: "whitesmoke",
            fontSize: "1.8rem",
          }}
        >
          Add Ingredient
        </CardHeader>
        <CardBody>
          {controls.map((item) => {
            return (
              <BuildControl
                label={item.label}
                added={() => addItem(item.type)}
                removed={() => removeItem(item.type)}
                key={Math.random()}
              />
            );
          })}
          <div style={{ float: "left" }}>
            <button
              className="btn btn-outline-secondary"
              onClick={() => dispatch(resetBurger())}
              style={{
                left: "0",
                padding: "10px 15px",
                marginLeft: "5px",
                fontSize: "1.2rem",
              }}
            >
              Reset
            </button>
          </div>
        </CardBody>
        <CardFooter style={{ fontSize: "1.5rem" }}>
          Price: {props.totalPrice} BDT.
        </CardFooter>
      </Card>
      <Link to="/checkout" style={{ textDecoration: "none" }}>
        <button
          disabled={!props.purchaseable}
          className="btn btn-lg btn-danger"
        >
          Checkout
        </button>
      </Link>
    </div>
  );
};
export default Controls;
