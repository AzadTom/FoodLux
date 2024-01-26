
import { createSlice } from "@reduxjs/toolkit";



const STATUS = Object.freeze({
    idle:"idle",
    loading:"loading",
    error:"error",
})

const initialState = {
    filterData:[],
    status:STATUS.idle,
}


const filterSlice = createSlice({
    name:"filter",
    initialState:initialState,
    reducers:{


        getFilter :(state,action)=>{

            state.filterData = action.payload; 

        }

    }
})

export const {getFilter} = filterSlice.actions;

export default filterSlice.reducer;