import { createSlice } from "@reduxjs/toolkit";



const STATUS = Object.freeze({
    idle:"idle",
    loading:"loading",
    error:"error",
})

const initialState = {
    token:"",
    status:STATUS.idle,
}

const tokenSlice  = createSlice({
    name:"token",
    initialState:initialState,
    reducers:{

      setToken:(state,action)=>{

        state.status = STATUS.loading;
        state.token = action.payload;
        state.status = STATUS.idle;

      }  

    }
})

export const {setToken} = tokenSlice.actions;

export default tokenSlice.reducer;