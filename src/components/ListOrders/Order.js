import React from "react";
import { Card, CardHeader, CardBody, Badge } from "reactstrap";
import {LABELS} from '../BurgerBuilder/data/index'

const Order = (props) => {
  const SUMMARY = props.order.orderSummary.map((item) => {
    return (
      <Badge
        color="dark"
        style={{ color: "white", display: "inline-block", fontSize: "1.2rem", marginRight: '10px' }}
        key={Math.random()}
      >
         {LABELS[item.item]}<span className="font-italic" style={{marginLeft: '6px'}}>x{item.count}</span>
      </Badge>
    );
  });

  return (
    <div className="py-3" style={{ maxWidth: "70%" }}>
      <Card>
        <CardHeader
          className="text-primary font-weight-bold"
          style={{ fontSize: "1.6rem" }}
        >
          ORDER ID {props.order.orderID}
        </CardHeader>
        <CardBody>
          <p className="text-secondary" style={{ fontSize: "1.5rem" }}>
            Name:{" "}
            <span className="">{props.order.customerDetails.clientName}</span>
          </p>
          <p className="text-secondary" style={{ fontSize: "1.5rem" }}>
            Burger Price: <span className="">{props.order.totalPrice} BDT</span>
          </p>
          <div className="my-3">{SUMMARY}</div>
          <p
            className="text-danger font-italic font-weight-bold"
            style={{ fontSize: "1rem" }}
          >
            Order Date:{" "}
            <span className="">
              {new Date(props.order.orderTime.seconds * 1000 ).toLocaleString()}
            </span>
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default Order;
