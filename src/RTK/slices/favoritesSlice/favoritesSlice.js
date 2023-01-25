import { createSlice } from "@reduxjs/toolkit";
import { REDUX_LS_KEY } from "../../../components/consts/consts";

const initialState = JSON.parse(window.localStorage.getItem(REDUX_LS_KEY))?.favorites || [];

export const favoritesSlice = createSlice({
    name: 'favorites', 
    initialState, 
    reducers: {
        addFavorites: (state, action) => {
            state.push(action.payload);
        }, 
        removeFavorites: (state, action) => {
            return state.filter(id => id !== action.payload);
        }, 
    }
})

export const {addFavorites, removeFavorites} = favoritesSlice.actions;

export default favoritesSlice.reducer;