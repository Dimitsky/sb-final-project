import { LS_TOKEN_KEY } from "../components/consts/consts"

export const initialState = {
    cart: [], 
    token: JSON.parse(window.localStorage.getItem(LS_TOKEN_KEY)) || null, 
}