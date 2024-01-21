import { createSlice } from "@reduxjs/toolkit";



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

        addToFav:(state,action)=>{


            state.wishData.push(action.payload);


        },

        removeToFav :(state,action)=>{

            state.wishData = state.wishData.filter((item)=> item.id != action.payload.id);

        }

    }
 })



 export default favSlice.reducer;

 export const {addToFav,removeToFav} = favSlice.actions;

 