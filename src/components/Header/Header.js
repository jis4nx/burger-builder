import React from "react";
import { Navbar, Nav, NavItem, NavbarBrand } from "reactstrap";
import Logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { auth } from "../Auth/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const [user, setUser] = React.useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  
  //Logout Function


  //Header Elements
  const RegisterEl = (
    <NavItem className="mx-5">
      <NavLink to="/signup" className="navlink">
        Register
      </NavLink>
    </NavItem>
  );
  const LogoutEl = (
    <NavItem className="mx-5">
      <NavLink to="/logout" className="navlink">
        Logout
      </NavLink>
    </NavItem>
  );
  

  return (
    <div>
      <Navbar className="navigation">
        <NavLink to ='/burger-builder' className="mr-auto ml-md-3">
          <img src={Logo} className="brand" />
        </NavLink>
        <Nav className="mr-md-5">
          <NavItem>
            <NavLink className="navlink">About</NavLink>
          </NavItem>
          <NavItem className="mx-5">
            <NavLink to="/orders" className="navlink">
              Orders
            </NavLink>
          </NavItem>
          {user ? LogoutEl : RegisterEl}
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
