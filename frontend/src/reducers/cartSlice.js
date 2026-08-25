import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServiceAddtocart, ServiceRemovetocart, ServiceGetCart, ServiceIncrementDecrement, Service2GetCart, Service2AddCart, Service2RemoveFromCart, Service2IncrementDecrement } from "../services/service.js";


const STATUS = Object.freeze({
  idle: "idle",
  loading: "loading",
  error: "error",
})

const initialState = {
  cart: [],
  status: STATUS.idle,
}



const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {


    setCartNull: (state, action) => {

      state.cart = [];

    }


  },
  extraReducers: (builder) => {

    builder.addCase(getCart.pending, (state, action) => {
      state.status = STATUS.loading;
    })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.status = STATUS.idle;
        console.log("cartSlice-getcart", action.payload);
      })
      .addCase(addTocart.fulfilled, (state, action) => {

        state.cart.push(action.payload);
        console.log("cartSlice-addtocart", action.payload);

      })
      .addCase(removeTocart.fulfilled, (state, action) => {

        state.cart = state.cart.filter((item) => (item.id !== action.payload.id));
        console.log("cartSlice-removetocart", action.payload);

      })
      .addCase(incrementDecrementCart.fulfilled, (state, action) => {

        const cartitem = state.cart.find((item) => item.id == action.payload.id);
        console.log("cartitem",cartitem);
        const index = state.cart.indexOf(cartitem);
        state.cart[index] = action.payload;
        console.log("cartSlice-incrementDecrement", action.payload);
      })


  }
})



export default cartSlice.reducer;

export const { setCartNull } = cartSlice.actions;

export const getCart = createAsyncThunk("/cart", async (ThunkApi) => {
  const data = await Service2GetCart();
  return data.data;
})

export const addTocart = createAsyncThunk("/cart/create", async (product, ThunkApi) => {
  const data = await Service2AddCart(product.id);
  return data.data;
})


export const removeTocart = createAsyncThunk("/cart/remove", async (product, Thunkpi) => {
  const data = await Service2RemoveFromCart(product.id);
  return data.data;
})

export const incrementDecrementCart = createAsyncThunk("/cart/incrementDecrement", async (product, ThunkApi) => {
  const data = await Service2IncrementDecrement(product.id, product.qty);
  return data.data;
})