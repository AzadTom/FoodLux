import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ServiceSignup ,ServiceSignin,ServiceUserProfile} from "../services/service.js";


const STATUS = Object.freeze({
    idle:"idle",
    loading:"loading",
    error:"error",
})

const initialState = {
    user:null,
    status:STATUS.idle,
}

const userSlice = createSlice({
    name:"users",
    initialState:initialState,
    extraReducers:(builder)=>{

       builder.addCase(signUp.pending,(state,action)=>{

          state.status = STATUS.loading;

       })
       .addCase(signUp.fulfilled,(state,action)=>{

        state.user = action.payload;
        state.status = STATUS.idle;


       })
        .addCase(signIn.pending,(state,action)=>{

            state.status = STATUS.loading;

        })
        .addCase(signIn.fulfilled,(state,action)=>{

        state.user = action.payload;
        state.status = STATUS.idle;


        })  

    }
})

export default userSlice.reducer;

export const signUp =  createAsyncThunk("/users",async(userDetail,ThunkApi)=>{


      const name  =  `${userDetail.first} ${userDetail.last}`;
      const email =  userDetail.email;
      const password =  userDetail.password;
     const data =  await ServiceSignup({name,email,password});

     return data;


})


export const signIn = createAsyncThunk("/users/signin",async(userDetail,ThunkApi)=>{

    
    const email =  userDetail.email;
    const password =  userDetail.password;
     const data = await ServiceSignin({email,password});

     return data;
})


