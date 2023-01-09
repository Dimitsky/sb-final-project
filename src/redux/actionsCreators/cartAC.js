import { ADD_PRODUCT, CHOOSE_PRODUCT, INCREMENT_PRODUCT, REMOVE_PRODUCT } from '../types/cartTypes';

export const addProduct = (id) => ({
    type: ADD_PRODUCT, 
    payload: {
        id, 
        count: 1, 
        isChoosed: true, 
    }
})

export const removeProduct = (id) => ({
    type: REMOVE_PRODUCT, 
    payload: id, 
})

export const incrementProduct = (id) => ({
    type: INCREMENT_PRODUCT, 
    payload: id, 
})

export const decrementProduct = (id) => ({
    type: INCREMENT_PRODUCT, 
    payload: id, 
})

export const chooseProduct = (id) => ({
    type: CHOOSE_PRODUCT, 
    payload: id, 
})