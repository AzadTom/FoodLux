import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../reducers/productSlice.js';
import cartReducer from '../reducers/cartSlice.js';
import filterReducer from '../reducers/filterSlice.js';
import favReducer from "../reducers/favSlice.js";
import userReducer from '../reducers/userSlice.js';
import tokenReducer from "../reducers/tokenSlice.js";

const store = configureStore({

    reducer:{
        product:productReducer,
        cart:cartReducer,
        filterData:filterReducer,
        favData:favReducer,
        user:userReducer,
        token:tokenReducer
    }
})


export default store;

