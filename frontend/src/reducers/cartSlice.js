import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServiceAddtocart ,ServiceRemovetocart,ServiceGetCart} from "../services/service.js";


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

      //  addtocart:(state,action)=>{

      //       state.cart.push(action.payload);

      //  },

      //  incrementDecrement:(state,action)=>{

      //    const item =  state.cart.find((item)=> item.id == action.payload.id);

      //    if(item)
      //    {
      //       const index = state.cart.indexOf(item);

      //       state.cart[index] = action.payload;

      //    }

      //  },

      //  removetocart:(state,action)=>{

      //       state.cart = state.cart.filter((item)=> (item.id !== action.payload.id));

      //  },

      //  setStatus : (state,action)=>{


      //   state.status = action.payload;

      //  }

  },
  extraReducers:(builder)=>{

     builder.addCase(getCart.pending,(state,action)=>{

           state.status = STATUS.loading;
     })
     .addCase(getCart.fulfilled,(state,action)=>{

         state.cart =  action.payload;
         state.status = STATUS.idle;
     })
     .addCase(addTocart.fulfilled,(state,action)=>{

       state.cart.push(action.payload);

     })
     .addCase(removeTocart.fulfilled,(state,action)=>{

       state.cart = state.cart.filter((item)=> (item.id !== action.payload.id));

     })
     

  }
})



export default cartSlice.reducer;


export const getCart = createAsyncThunk("/cart",async(token,ThunkApi)=>{

      const data = await ServiceGetCart(token);

      return data;
})

export const addTocart = createAsyncThunk("/cart/create",async(product,ThunkApi)=>{

      const data = await ServiceAddtocart(product.item,product.token);

      return data;
})


export const removeTocart = createAsyncThunk("/cart/remove",async(product,Thunkpi)=>{

     const data = await ServiceRemovetocart(product.id,product.token);

     return data;
})