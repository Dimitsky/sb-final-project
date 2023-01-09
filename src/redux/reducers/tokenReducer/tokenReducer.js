import { initialState } from '../../initialState';
import { SET_TOKEN, REMOVE_TOKEN } from "../../types/tokenTypes";

export const tokenReducer = (state = initialState.token, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return action.payload;
        case REMOVE_TOKEN:
            return action.payload;
        default:
            return state;
    }
}