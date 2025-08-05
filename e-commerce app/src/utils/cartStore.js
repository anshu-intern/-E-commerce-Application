//Create the Redux store with cart reducer.

import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";

const cartStore = configureStore(
    {
        reducer: {
            cart: cartReducer,
        }
    }
);

export default cartStore;