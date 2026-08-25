import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {Service2Getfav, Service2Addtofav, Service2Removetofav} from '../services/service.js';


const STATUS = Object.freeze({
    idle:"idle",
    loading:"loading",
    error:"error",
})

const initialState = {
    wishData:[],
    status:STATUS.idle,
}

 const favSlice = createSlice({

    name:"fav",
    initialState:initialState,
    reducers:{

        setWishlistToNull:(state,action)=>{

            state.wishData = [];
        }

    },

    extraReducers:(builder)=>{


        builder.addCase(getfavs.pending,(state,action)=>{

            state.status = STATUS.loading;
        })
        .addCase(getfavs.fulfilled,(state,action)=>{

            state.wishData =  action.payload;
            state.status = STATUS.idle;
        })
        .addCase(addTOfav.fulfilled,(state,action)=>{
            state.wishData.push(action.payload);
        })
        .addCase(removeTofav.fulfilled,(state,action)=>{
             console.log(action.payload);
            state.wishData = state.wishData.filter((item)=>(item.id !== action.payload.id));
        })

    }
 })



 export default favSlice.reducer;

 export const {setWishlistToNull} = favSlice.actions;


 export const getfavs = createAsyncThunk("/fav/get",async(ThunkApi)=>{
    const data  = await Service2Getfav();
    return data.data;
 })

 export const addTOfav = createAsyncThunk("/fav/add",async(product,ThunkApi)=>{
     const data  = await Service2Addtofav(product.id);
     return data.data;
 })

 export const removeTofav = createAsyncThunk("/fav/remove",async(product,ThunkApi)=>{
    const data  = await Service2Removetofav(product.id);
    return data.data;
})