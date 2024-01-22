import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServiceAddtocart ,ServiceRemovetocart,ServiceGetCart, ServiceIncrementDecrement} from "../services/service.js";


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

      
      setCartNull:(state,action)=>{

        state.cart = [];

      }
       

  },
  extraReducers:(builder)=>{

     builder.addCase(getCart.pending,(state,action)=>{

           state.status = STATUS.loading;
     })
     .addCase(getCart.fulfilled,(state,action)=>{

         state.cart =  action.payload.cartData;
         state.status = STATUS.idle;

         console.log("cartSlice-getcart",action.payload.cartData);
     })
     .addCase(addTocart.fulfilled,(state,action)=>{

       state.cart.push(action.payload.singlecart);
       console.log("cartSlice-addtocart",action.payload.singlecart);

     })
     .addCase(removeTocart.fulfilled,(state,action)=>{

       state.cart = state.cart.filter((item)=> (item._id !== action.payload.singlecart._id));
       console.log("cartSlice-removetocart",action.payload.singlecart);

     })
     .addCase(incrementDecrementCart.fulfilled,(state,action)=>{

       const cartitem = state.cart.find((item)=> item._id == action.payload.singlecart._id);

       const index  = state.cart.indexOf(cartitem);

       state.cart[index] = action.payload.singlecart;
       
       console.log("cartSlice-incrementDecrement",action.payload.singlecart);

     })
     

  }
})



export default cartSlice.reducer;

export const {setCartNull} = cartSlice.actions;

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

export const incrementDecrementCart = createAsyncThunk("/cart/incrementDecrement",async(product,ThunkApi)=>{

    const data = await ServiceIncrementDecrement(product.item,product.token);

    return data;
})