import { createSlice } from "@reduxjs/toolkit";
import { REDUX_LS_KEY } from '../../../components/consts/consts';

const initialState = JSON.parse(window.localStorage.getItem(REDUX_LS_KEY))?.token || null

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