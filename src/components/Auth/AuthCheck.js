import { setUserToken } from "../../store/reducers/userReducer";

const authCheck = () => (dispatch) => {
  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("uid")
  if (token) {
    dispatch(setUserToken({token: token, uid: uid}));
  } else {
    console.log('token not found in local storage')
  }
};

export default authCheck;
