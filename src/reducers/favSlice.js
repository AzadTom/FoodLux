import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServiceAddtofav,ServiceRemovetofav,ServiceGetfav} from '../services/service.js';


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

            state.wishData.push(action.payload.singlefav);
        })
        .addCase(removeTofav.fulfilled,(state,action)=>{

             
            state.wishData = state.wishData.filter((item)=>(item._id !== action.payload._id));
        })

    }
 })



 export default favSlice.reducer;

 export const {setWishlistToNull} = favSlice.actions;


 export const getfavs = createAsyncThunk("/fav/get",async(token,ThunkApi)=>{

    const data  = await ServiceGetfav(token);

    return data;
 })

 export const addTOfav = createAsyncThunk("/fav/add",async(product,ThunkApi)=>{

     const data  = await ServiceAddtofav(product.item,product.token);

     return data;
 })


 export const removeTofav = createAsyncThunk("/fav/remove",async(product,ThunkApi)=>{

    const data  = await ServiceRemovetofav(product.id,product.token);

    return data;
})