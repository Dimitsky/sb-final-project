import { createSlice } from "@reduxjs/toolkit";
import { REDUX_LS_KEY } from "../../../components/consts/consts";

const SORT = {
    PRICE_UP: 'PRICE_UP', 
    PRICE_DOWN: 'PRICE_DOWN', 
    DISCOUNT_UP: 'DISCOUNT_UP', 
    DISCOUNT_DOWN: 'DISCOUNT_DOWN', 
    DATE_UP: 'DATE_UP', 
    DATE_DOWN: 'DATE_DOWN', 
}

const params = (new URL(window.location)).searchParams;
const sort = params.get('sort') || SORT.DATE_DOWN;

const initialState = sort;

export const sortSlice = createSlice({
    name: 'sort', 
    initialState, 
    reducers: {
        setSort: (state, action) => action.payload, 
    }
});

export {
    SORT, 
}

export const {setSort} = sortSlice.actions;

export default sortSlice.reducer;