//cart slice to manage cart-related state and actions:
// Add item to cart
// Increase quantity of a cart item
// Decrease quantity of a cart item
// Remove an item completely from the cart
// Clear the entire cart

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice(
    {
        name: "cart",
        initialState: {
            items: [],
        },
        reducers: {
            addtoCart: (state,action) => {
                const item = action.payload;
                const exists = state.items.find(i => i.id === item.id);
                if (exists)
                {
                    exists.quantity += 1;
                }else{
                    state.items.push(item);
                }
            },
            incCartQuantity: (state,action) => {
                const target = state.items.find(i => i.id === action.payload.id);
                if (target)
                {
                    target.quantity++;
                }
            },
            decCartQuantity: (state,action) => {
                const target = state.items.find(i => i.id === action.payload.id);
                if ( target && target.quantity > target.minimumOrderQuantity)
                {
                    target.quantity--;
                }
                target.quantity < 0 ? target.quantity = 0 : target.quantity;
            },
            removefromCart: (state,action) => {
                state.items = state.items.filter(itm => itm.id !== action.payload.id);
            },
            clearCart: (state) => {
                state.items = [];
            },
        },
    }
);
export const {addtoCart,incCartQuantity,decCartQuantity,removefromCart,clearCart} = cartSlice.actions;
export default cartSlice.reducer;
