import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Serviceproducts} from '../services/service.js';


const STATUS = Object.freeze({
    idle:"idle",
    loading:"loading",
    error:"error",
})

const initialState = {
    products:[],
    status:STATUS.idle,
}

const productSlice = createSlice({
    name : "products",
    initialState:initialState,
    reducers:{},
    extraReducers: (builder)=>{

        builder.addCase(productsData.fulfilled,(state,action)=>{

            state.products = action.payload.data;
            state.status = STATUS.idle;
        })
        .addCase(productsData.pending,(state,action)=>{

            state.status = STATUS.loading;
        })
        

    }
})


export const  { getProducts ,setStatus} = productSlice.actions;

export default productSlice.reducer;



export const productsData =  createAsyncThunk("/products",async(params,ThunkApi)=>{

     const data  =  await Serviceproducts();

     return data;

})




