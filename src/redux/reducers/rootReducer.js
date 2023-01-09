import { combineReducers } from "redux";
import { tokenReducer } from './tokenReducer/tokenReducer';

export const rootReducer = combineReducers({
    token: tokenReducer, 
});