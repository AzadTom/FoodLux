import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../reducers/cartSlice.js';
import filterReducer from '../reducers/filterSlice.js';
import favReducer from "../reducers/favSlice.js";
import userReducer from '../reducers/userSlice.js';

const store = configureStore({

    reducer:{
        cart:cartReducer,
        filterData:filterReducer,
        favData:favReducer,
        user:userReducer,
    }
})


export default store;

