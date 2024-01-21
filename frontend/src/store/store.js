import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../reducers/productSlice.js';
import cartReducer from '../reducers/cartSlice.js';
import filterReducer from '../reducers/filterSlice.js';
import favReducer from "../reducers/favSlice.js";

const store = configureStore({

    reducer:{
        product:productReducer,
        cart:cartReducer,
        filterData:filterReducer,
        favData:favReducer
    }
})


export default store;

