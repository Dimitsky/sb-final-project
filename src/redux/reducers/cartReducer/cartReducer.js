import { initialState } from "../../initialState";
import { ADD_PRODUCT, CHOOSE_PRODUCT, DECREMENT_PRODUCT, INCREMENT_PRODUCT, REMOVE_PRODUCT } from "../../types/cartTypes";

export const cartReducer = (state = initialState.cart, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return [...state, action.payload]
        case REMOVE_PRODUCT:            
            return state.filter(product => product.id !== action.payload);
        case INCREMENT_PRODUCT:
            console.log('increment product');
            return state
        case DECREMENT_PRODUCT:
            console.log('decrement product');
            return state
        case CHOOSE_PRODUCT:
            console.log('choose product')
            return state
        default:
            return state
    }
}