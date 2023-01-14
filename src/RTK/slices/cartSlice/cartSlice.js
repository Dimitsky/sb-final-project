import { createSlice } from "@reduxjs/toolkit";
import { REDUX_LS_KEY } from "../../../components/consts/consts";

const initialState = JSON.parse(window.localStorage.getItem(REDUX_LS_KEY))?.cart || [];

export const cartSlice = createSlice({
    name: 'cart', 
    initialState, 
    reducers: {
        addProduct: (state, action) => {
            const product = {
                id: action.payload, 
                count: 1, 
                isChoosed: true, 
            }

            state.push(product);
        }, 
        removeProduct: (state, action) => state.filter(product => product.id !== action.payload), 
        incrementProduct: (state, action) => {
            const product = state.find(product => product.id === action.payload);

            product.count++;
        }, 
        decrementProduct: (state, action) => {
            const product = state.find(product => product.id === action.payload);
            
            product.count--;
        }, 
        chooseProduct: (state, action) => {
            const product = state.find(product => product.id === action.payload);

            product.isChoosed = !product.isChoosed;
        }, 
        clearCart: () => [], 
    }
})

export const {addProduct, removeProduct, incrementProduct, decrementProduct, chooseProduct, clearCart} = cartSlice.actions;

export default cartSlice.reducer;