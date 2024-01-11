import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
 
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            state.cart.push(action.payload)
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload)
        },
        increaseItemQuanity(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity++
            item.totalPrice = item.quantity * item.unitPrice
        },
        decreaseItemQuantity(state, action) {
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity--
            item.totalPrice = item.quantity * item.unitPrice
        },
        clearCart(state) {
            state.cart = []
        }
    }
})


export const {addItem,deleteItem,increaseItemQuanity,decreaseItemQuantity,clearCart} = cartSlice.actions
export default cartSlice.reducer
export const getTotalCartQuantity = (store)=>store.cart.cart.reduce((sum,item)=>sum+=item.quantity,0)
export const getTotalCartPrice = (store)=>store.cart.cart.reduce((sum,item)=>sum+=item.totalPrice,0)
export const getCart = store=>store.cart.cart
export const getCurrentQuantity = id => store=> store.cart.cart.find(item=>item.pizzaId===id)?.quantity ?? 0
