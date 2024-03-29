import { createSlice } from "@reduxjs/toolkit";

const FILTERS = {
    ALL: 'ALL', 
    DISCOUNT: 'DISCOUNT', 
    NEW: 'NEW', 
    LIKED: 'LIKED', 
}

const params = (new URL(window.location)).searchParams;
const filter = params.get('filter') || FILTERS.ALL;

const initialState = filter;

export const visibilityFilterSlice = createSlice({
    name: 'visibilityFilter', 
    initialState, 
    reducers: {
        setVisivibilyFilter: (state, action) => action.payload, 
        removeVisibilityFilter: () => FILTERS.ALL, 
    }
})

export {
    FILTERS, 
}

export const { setVisivibilyFilter, removeVisibilityFilter } = visibilityFilterSlice.actions;

export default visibilityFilterSlice.reducer;