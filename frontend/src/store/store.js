import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../reducers/productSlice.js';
import cartReducer from '../reducers/cartSlice.js';
import filterReducer from '../reducers/filterSlice.js';
import favReducer from "../reducers/favSlice.js";
import userReducer from '../reducers/userSlice.js';
import userSlice from "../reducers/userSlice.js";

const store = configureStore({

    reducer:{
        product:productReducer,
        cart:cartReducer,
        filterData:filterReducer,
        favData:favReducer,
        user:userSlice
    }
})


export default store;

