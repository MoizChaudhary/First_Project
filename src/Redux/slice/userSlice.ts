// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    
  },
});

export const { setUser, } = userSlice.actions;

export const selectUser = (state: {userSlice:any}) => {
  return state.userSlice.user;
};

export default userSlice.reducer;
