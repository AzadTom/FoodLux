import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ServiceSignup ,ServiceSignin,ServiceUserProfile} from "../services/service.js";


const STATUS = Object.freeze({
    idle:"idle",
    loading:"loading",
    error:"error",
})

const initialState = {
    user:"",
    status:STATUS.idle,
}

const userSlice = createSlice({
    name:"users",
    initialState:initialState,
    reducers:{

     setUserNull:(state,action)=>{

        state.user = "";
        state.status = STATUS.idle;

     }   

    },
    extraReducers:(builder)=>{

       builder.addCase(signUp.pending,(state,action)=>{

          state.status = STATUS.loading;

       })
       .addCase(signUp.rejected,(state,action)=>{

          state.status = STATUS.error;
          state.user = action.error.message;
            
       })
       .addCase(signUp.fulfilled,(state,action)=>{

        state.user = action.payload;
        state.status = STATUS.idle;


       })
        .addCase(signIn.pending,(state,action)=>{

            state.status = STATUS.loading;

        })
        .addCase(signIn.rejected,(state,action)=>{

            state.status = STATUS.error;
            state.user = action.error.message;
              
         })
        .addCase(signIn.fulfilled,(state,action)=>{

        state.user = action.payload;
        state.status = STATUS.idle;


        })  

    }
})

export default userSlice.reducer;

export const {setUserNull} = userSlice.actions;

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


