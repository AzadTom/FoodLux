import { createSlice } from "@reduxjs/toolkit";



const STATUS = Object.freeze({
    idle:"idle",
    loading:"loading",
    error:"error",
})

const initialState = {
    token:null,
    status:STATUS.idle,
}

const tokenSlice  = createSlice({
    name:"token",
    initialState:initialState,
    reducers:{

      setToken:(state,action)=>{

        state.status = STATUS.loading;
        if(action.payload)
        {
          state.token = action.payload;
        }
        else
        {
          state.token = null;
        }
        state.status = STATUS.idle;
      }  

    }
})

export const {setToken} = tokenSlice.actions;

export default tokenSlice.reducer;