import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isLoggedIn:false, 
    token:null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
      state.token = action.payload.token
      state.user = action.payload.user
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = state=> state.user;
export default userSlice.reducer;