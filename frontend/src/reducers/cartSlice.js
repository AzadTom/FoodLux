import { createSlice } from "@reduxjs/toolkit";



const STATUS = Object.freeze({
    idle:"idle",
    loading:"loading",
    error:"error",
})

const initialState = {
    cart:[],
    status:STATUS.idle,
}



const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{

       addtocart:(state,action)=>{

            state.cart.push(action.payload);

       },

       incrementDecrement:(state,action)=>{

         const item =  state.cart.find((item)=> item.id == action.payload.id);

         if(item)
         {
            const index = state.cart.indexOf(item);

            state.cart[index] = action.payload;

         }

       },

       removetocart:(state,action)=>{

            state.cart = state.cart.filter((item)=> (item.id !== action.payload.id));

       },

       setStatus : (state,action)=>{


        state.status = action.payload;

       }

  }
})

export const {addtocart,removetocart,incrementDecrement,setStatus} = cartSlice.actions;

export default cartSlice.reducer;

