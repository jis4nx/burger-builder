import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";
import SuccessOrder from './SuccessOrder'
import {collection, addDoc} from 'firebase/firestore'
import {db, auth} from '../../Auth/firebase'


const ordersCollectionRef = collection(db, 'orders')

const mapStateToProps = (state) => {
  return{
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    orderSummary: state.burgerBuilder.ORDER_SUMMARY,
    uid: state.user.userId,
    token : state.user.idToken
  }
}


class PlaceOrder extends Component {
  state = {
    values: {
      clientName: "",
      fullAddress: "",
      phoneNumber: "",
      paymentMethod: "Cash On Delivery",
    },
    isLoading: false,
    resStatus: false,
    orderPlaced: false
  };

  handleInput = (e) => {
    this.setState({
      values: {
        ...this.state.values,
        [e.target.name]: e.target.value,
      },
    });
  };

  submitHandler = async() => {
    this.setState({isLoading: true})
    const ORDER = {
      userId: auth?.currentUser?.uid,
      ingredients: this.props.ingredients,
      orderSummary: this.props.orderSummary,
      totalPrice: this.props.totalPrice,
      customerDetails: this.state.values,
      orderTime: new Date(),
    };

    try{
      await addDoc(ordersCollectionRef, ORDER)
      this.setState({orderPlaced: true, isLoading: false})
    }catch(err){
      console.log(err)
      this.setState({orderPlaced: false, isLoading: false})
    }


    // axios
    //   .post(
    //     "https://influential-hub-227710-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?auth=" + this.props.token,
    //     ORDER
    //   )
    //   .then((res) => {
    //     if (res.status === 200) {
    //       this.setState({orderPlaced: true, isLoading: false})
    //     } else {
    //       this.setState({ orderPlaced: false });
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };

  render() {
    const form = (
      <>
        <p className="text-primary h3 text-center">Place Your Order</p>
        <div className="d-flex justify-content-center">
          <form
            action=""
            className="shadow p-3 mb-5 bg-white rounded form-group"
            style={{ flexBasis: "60%" }}
          >
            <div className="mb-4">
              <label htmlFor="clientName" className="h5 text-secondary">
                Your Name
              </label>
              <input
                type="text"
                name="clientName"
                className="form-control"
                style={{ fontSize: "1.6rem" }}
                value={this.state.values.clientName}
                onChange={(e) => this.handleInput(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="h5 text-secondary">
                Full Address
              </label>
              <input
                type="text"
                name="fullAddress"
                className="form-control"
                style={{ fontSize: "1.6rem" }}
                value={this.state.values.fullAddress}
                onChange={(e) => this.handleInput(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="h5 text-secondary">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                className="form-control"
                style={{ fontSize: "1.6rem" }}
                value={this.state.values.phoneNumber}
                onChange={(e) => this.handleInput(e)}
              />
            </div>
            <label htmlFor="" className="h5 text-secondary">
              Payment Method
            </label>
            <select
              id=""
              name="paymentMethod"
              className="form-control paymentMethod"
              value={this.state.values.paymentMethod}
              onChange={(e) => this.handleInput(e)}
              style={{ fontSize: "1.6rem" }}
            >
              <option value="COD" className="h5">
                Cash On Delivery
              </option>
              <option value="bkash" className="h5">
                Bkash
              </option>
              <option value="nagad" className="h5">
                Nagad
              </option>
            </select>
            <div className="d-flex justify-content-center mt-5">
              <button
                type="button"
                className="btn btn-success btn-lg"
                onClick={this.submitHandler}
              >
                Place Order
              </button>
              <button type="button" className="btn btn-danger btn-lg mx-4">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </>
    );
    return (
      <div>
        {this.state.isLoading ? <Spinner/> : ''}
        {this.state.orderPlaced ? <SuccessOrder/> : form}
      </div>);
  }
}
export default connect(mapStateToProps)(PlaceOrder);
