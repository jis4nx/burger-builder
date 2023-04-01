import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initState = {
  orders: []
}
const displayOrderSlice = createSlice({
  name: 'displayOrder',
  initialState : initState,
  reducers: {
    loadOrders: (state, action) => {
      axios.get('https://influential-hub-227710-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json')
        .then(res => console.log(res))
    }
  }
})
