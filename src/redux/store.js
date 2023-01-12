import { createStore } from "redux";
import { rootReducer } from "./reducers/rootReducer";

// my comps
import { REDUX_LS_KEY } from "../components/consts/consts";

export const store = createStore(rootReducer);

store.subscribe(() => {
    localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()))
})