import { configureStore } from "@reduxjs/toolkit";
import { REDUX_LS_KEY } from "../components/consts/consts";
import cartSlice from "./slices/cartSlice/cartSlice";
import tokenSlice from "./slices/tokenSlice/tokenSlice";
import visibilityFilterSlice from "./slices/visibilityFilterSlice/visibilityFilterSlice";

export const store = configureStore({
    reducer: {
        token: tokenSlice, 
        cart: cartSlice, 
        visibilityFilter: visibilityFilterSlice, 
    }
});

store.subscribe(() => {
    console.log(store.getState())
    localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()));
})