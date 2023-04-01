import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Auth/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken } from "../../store/reducers/userReducer";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { currentUser } = useAuth();
  const { token } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(setUserToken({token: currentUser.accessToken, uid: currentUser.uid}));
    } else {
    }
  });

  return (
    <div>
      <p className="text-primary h4">
        Logged in as {currentUser && currentUser.email}
      </p>
    </div>
  );
};

export default Profile;
