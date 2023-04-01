import {createSlice} from '@reduxjs/toolkit'


const initState = {
  idToken : '',
  userId : ''
}

const userSlice = createSlice({
  name: 'user',
  initialState : initState,
  reducers: {
    setUserToken: (state, action) => {
      state.idToken = action.payload.token
      state.userId = action.payload.uid
    }
  }
})


export const {setUserToken} = userSlice.actions
export default userSlice.reducer
