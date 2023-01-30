import { createSlice } from "@reduxjs/toolkit";

const FILTERS = {
    ALL: 'ALL', 
    DISCOUNT: 'DISCOUNT', 
    NEW: 'NEW', 
    LIKED: 'LIKED', 
}
const initialState = FILTERS.ALL;

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