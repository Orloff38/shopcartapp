import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem('cart_app_items')) || [],
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.find((item) => item.id === action.payload);
      if (isExist) {
        return state.map((item) => {
          if (item.id === action.payload) {
            return { id: item.id, count: item.count + 1 };
          } else return item;
        });
      } else {
        return [...state, { id: action.payload, count: 1 }];
      }
    },
    removeItem: (state, action) => {
      const currentItem = state.find((i) => i.id === action.payload);

      if (currentItem.count > 1) {
       currentItem.count -=1
      }else return state.filter((i) => i.id !== action.payload);
      },

      deleteItem: (state, action)=>{
        return state.filter((i) => i.id !== action.payload);
      }

    },
  },
);

export const { addToCart, removeItem, deleteItem} = CartSlice.actions;
export default CartSlice.reducer;
