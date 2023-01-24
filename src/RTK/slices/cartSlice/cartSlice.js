import { createSlice } from "@reduxjs/toolkit";
import { REDUX_LS_KEY } from "../../../components/consts/consts";

const initialState = JSON.parse(window.localStorage.getItem(REDUX_LS_KEY))?.cart || [];

export const cartSlice = createSlice({
    name: 'cart', 
    initialState, 
    reducers: {
        add: (state, action) => {
            const product = {
                id: action.payload, 
                count: 1, 
                isChoosed: true, 
            }

            state.push(product);
        }, 
        remove: (state, action) => state.filter(product => product.id !== action.payload), 
        increment: (state, action) => {
            const product = state.find(product => product.id === action.payload);

            product.count++;
        }, 
        decrement: (state, action) => {
            const product = state.find(product => product.id === action.payload);
            
            product.count--;
        }, 
        toggle: (state, action) => {
            const product = state.find(product => product.id === action.payload);

            product.isChoosed = !product.isChoosed;
        }, 
        clearCart: () => [], 
    }
})

export const {add, remove, increment, decrement, toggle, clearCart} = cartSlice.actions;

export default cartSlice.reducer;