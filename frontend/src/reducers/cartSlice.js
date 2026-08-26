import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Service2GetCart, Service2AddCart, Service2RemoveFromCart, Service2IncrementDecrement } from "../services/service.js";


const STATUS = Object.freeze({
  idle: "idle",
  loading: "loading",
  error: "error",
})

const initialState = {
  cart: [],
  status: STATUS.idle,
  addToCartId: "",
  removeToCartId: "",
  incrementDecrementCartId: ""
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
      })
      .addCase(addTocart.pending, (state, action) => {
        state.addToCartId = action.meta.arg.id;
      })
      .addCase(addTocart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
        state.addToCartId = "";
      }).
      addCase(removeTocart.pending, (state, action) => {

        state.removeToCartId = action.meta.arg.id;

      })
      .addCase(removeTocart.fulfilled, (state, action) => {

        state.cart = state.cart.filter((item) => (item.id !== action.payload.id));
        state.removeToCartId = "";

      })
      .addCase(incrementDecrementCart.pending, (state, action) => {
        state.incrementDecrementCartId = action.meta.arg.id;
      })
      .addCase(incrementDecrementCart.fulfilled, (state, action) => {

        const cartitem = state.cart.find((item) => item.id == action.payload.id);
        const index = state.cart.indexOf(cartitem);
        state.cart[index] = action.payload;
        state.incrementDecrementCartId = "";

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