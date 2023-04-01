import {configureStore} from '@reduxjs/toolkit'
import burgerBuilderReducer from './reducers/reducer'
import userReducer from './reducers/userReducer'
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const store = configureStore({
  reducer:{
    burgerBuilder: burgerBuilderReducer,
    user: userReducer
  },
  middleware: customizedMiddleware
})

export default store
