import { configureStore } from "@reduxjs/toolkit";
import { REDUX_LS_KEY } from "../components/consts/consts";
import cartSlice from "./slices/cartSlice/cartSlice";
import tokenSlice from "./slices/tokenSlice/tokenSlice";
import visibilityFilterSlice from "./slices/visibilityFilterSlice/visibilityFilterSlice";
import favoritesSlice from "./slices/favoritesSlice/favoritesSlice";
import sortSlice from "./slices/sortSlice/sortSlice";

export const store = configureStore({
    reducer: {
        token: tokenSlice, 
        cart: cartSlice, 
        visibilityFilter: visibilityFilterSlice, 
        favorites: favoritesSlice, 
        sort: sortSlice, 
    }
});

// Нужна для первой синхронизации (например, если страница загружена с фильтром в URL)
localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()));

store.subscribe(() => {
    localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()));
})