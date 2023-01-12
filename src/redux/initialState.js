// my comps
import { REDUX_LS_KEY } from "../components/consts/consts"

export const initialState = {
    cart: [], 
    token: JSON.parse(window.localStorage.getItem(REDUX_LS_KEY)).token || null, 
}