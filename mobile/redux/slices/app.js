import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showSnack: false,
    message:"", 
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.showSnack = action.payload.show
      state.message = action.payload.message
    },
    close: (state, action) => {
        state.showSnack = false
        state.message = ""
    },
  },
});

export const { addMessage, close } = appSlice.actions;
export const snackStatus = state=> state.showSnack;
export default appSlice.reducer;