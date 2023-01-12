import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: JSON.parse(window.localStorage.getItem(LS_TOKEN_KEY)) || null, 
}

export const tokenSlice = createSlice({
    name: 'token', 
    initialState, 
    reducers: {
        setToken: (state, action) => action.payload, 
        removeToken: () => null, 
    }
})

export const {setToken, removeToken} = tokenSlice.actions;

export default tokenSlice.reducer;