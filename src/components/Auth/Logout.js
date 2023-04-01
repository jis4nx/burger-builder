import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import {auth } from '../Auth/firebase'
import {setUserToken} from '../../store/reducers/userReducer'
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  signOut(auth).then(() => {
    dispatch(setUserToken(""));
    localStorage.clear();
  });

  useEffect(() => {
    navigate('/signup')
  })

  return(
    <p className='h3 text-center text-secondary'>Logged Out</p>
  )
};

export default Logout
