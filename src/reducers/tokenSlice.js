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

        const localData  =  localStorage.getItem("token");
        const token  = JSON.parse(localData);
        state.token = token;
        state.status = STATUS.idle;

      },

      setRemoveToken:(state,action)=>{

          localStorage.removeItem("token");
          state.token = "";
 
      }

    }
})

export const {setToken ,setRemoveToken} = tokenSlice.actions;

export default tokenSlice.reducer;