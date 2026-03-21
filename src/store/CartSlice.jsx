import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, action) => [...state, action.payload],
        removeItem: (state, action) =>{
            return state.filter(i=>i.id!==action.payload)
        }
    }
})

export const { addToCart, removeItem } = CartSlice.actions
export default CartSlice.reducer