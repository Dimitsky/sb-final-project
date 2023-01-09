import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer/cartReducer";
import { tokenReducer } from './tokenReducer/tokenReducer';

export const rootReducer = combineReducers({
    cart: cartReducer, 
    token: tokenReducer, 
});