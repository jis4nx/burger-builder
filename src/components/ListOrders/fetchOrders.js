import React, { useEffect, useState } from "react";
import { loadOrders} from "../../store/reducers/reducer";
import { useDispatch, useSelector } from "react-redux";
import Order from "./Order";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../Auth/firebase";
import Spinner from '../BurgerBuilder/Spinner/Spinner'

const ordersCollectionRef = collection(db, "orders");

function Orders() {
  //States
  const [netErr, setNetErr] = useState();
  const [isLoading, setIsLoading] = useState(true)


  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.burgerBuilder.orders);
  const uid = useSelector((state) => state.user.userId);
  const q = query(ordersCollectionRef, where("userId", "==", uid));

  useEffect(() => {
    const data = [];
    const unsub = onSnapshot(
      q,
      (querySnapShot) => {
        querySnapShot.forEach((doc) => {
          data.push(doc.data());
        });
        dispatch(loadOrders(data));
        setIsLoading(false)
      },
      (err) => {
        setNetErr(err.code);
        setIsLoading(false)
      }
    );
    return () => {
      unsub();
    };
  });

  let orders;
  if (orderList.length) {
    orders = orderList.map((order) => {
      return <Order order={order} key={Math.random()} />;
    });
  } else {
    orders = <p className='text-center h3 text-info'>Sorry no orders found!</p>;
  }

  return (
    <div>
      {isLoading? <Spinner/>:netErr?<p className='text-danger text-center h3'>Who tf are you? identify yourself!</p>:orders}
    </div>
  );
}

export default Orders;
