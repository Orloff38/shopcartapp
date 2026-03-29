import { configureStore } from "@reduxjs/toolkit";
import CartReducer from './CartSlice'


const store = configureStore({
    reducer:{
        cart: CartReducer
    }
})


store.subscribe(()=>{
localStorage.setItem('cart_app_items', JSON.stringify(store.getState().cart))
})

export default store