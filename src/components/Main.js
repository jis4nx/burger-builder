import React from "react";
import Header from "./Header/Header.js";
import { connect } from "react-redux";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder.js";
import { Routes, Route } from "react-router-dom";
import PlaceOrder from "./BurgerBuilder/Order/PlaceOrder";
import Orders from "../components/ListOrders/fetchOrders";
import SignUp from "../components/Auth/SignUp";
import authCheck from "../components/Auth/AuthCheck";
import Login from "../components/Auth/Login";
import Profile from "../components/Profile/profile";
import Logout from '../components/Auth/Logout'
import "../App.css";
import { AuthProvider } from "./contexts/AuthContext.js";

const mapStateToProps = (state) =>{
  return{
    token : state.user.idToken
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    checkAuth: () => dispatch(authCheck())
  }
}

class Main extends React.Component {
  UNSAFE_componentWillMount(){
    this.props.checkAuth()
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <Routes>
            <Route path="*" element={<BurgerBuilder />}></Route>
            <Route path="/checkout/placeOrder" element={<PlaceOrder />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={
              <AuthProvider><Profile/></AuthProvider>
            }></Route>
            <Route path="/logout" element={<Logout />}></Route>
          </Routes>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Main);
