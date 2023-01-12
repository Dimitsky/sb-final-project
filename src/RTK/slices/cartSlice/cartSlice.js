import { createSlice } from "@reduxjs/toolkit";
import tokenSlice from "../tokenSlice/tokenSlice";

const initialState = {
    cart: [], 
}

export const cartSlice = createSlice({
    name: 'cart', 
    initialState, 
    reducers: {
        addProduct: (state, action) => [...state, action.payload], 
        removeProduct: (state, action) => state.filter(product => product.id !== action.payload), 
        incrementProduct: (state, action) => state.map(product => {
            if (product.id !== action.payload) return product;
            else {
                product.count++;
                return product;
            }
        }), 
        decrementProduct: (state, action) => state.map(product => {
            if (product.id !== action.payload) return product;
            else {
                product.count--;
                return product;
            }
        }), 
        chooseProduct: (state, action) => state.map(product => {
            if (product.id !== action.payload) return product;
            else {
                product.isChoosed = !product.isChoosed;
                return product;
            }
        })
    }
})

export const {addProduct, removeProduct, incrementProduct, decrementProduct, chooseProduct} = cartSlice.actions;

export default cartSlice.reducer;