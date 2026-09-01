import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ServiceSignup, ServiceSignin } from "../services/service.js";

const STATUS = Object.freeze({
    idle: "idle",
    loading: "loading",
    error: "error",
    sucess: "success",
})

function getInitialSate() {
    const access_token = localStorage.getItem("accesstoken");
    const info = localStorage.getItem("info");
    return {
        isLogin: access_token ? true : false,
        access_token: access_token ? access_token : "",
        user: info ? info : "",
        status: STATUS.idle,
    };
};

const userSlice = createSlice({
    name: "users",
    initialState: getInitialSate(),
    reducers: {

        setUserNull: (state, action) => {
            state.user = "";
            state.status = STATUS.idle;
            state.isLogin =false;
            state.access_token = "";
            localStorage.removeItem("accesstoken");
            localStorage.removeItem("info");
        },
        setUserData:(state,action)=>{
            const accesstoken = action.payload.token;
            state.user = accesstoken;
            state.isLogin =true;
            state.access_token=accesstoken;
            localStorage.setItem("accesstoken", accesstoken);
            localStorage.setItem("info", JSON.stringify(action.payload));
        }

    },
    extraReducers: (builder) => {

        builder.addCase(signUp.pending, (state, action) => {

            state.status = STATUS.loading;

        })
            .addCase(signUp.rejected, (state, action) => {

                state.status = STATUS.error;
                state.user = action.error.message;

            })
            .addCase(signUp.fulfilled, (state, action) => {

                state.user = action.payload;
                state.status = STATUS.sucess;
                const token = action.payload?.data?.access_token;
                state.access_token = token;
                state.isLogin = true;
                localStorage.setItem("accesstoken", token);
                localStorage.setItem("info", JSON.stringify(action.payload));

            })
            .addCase(signIn.pending, (state, action) => {

                state.status = STATUS.loading;

            })
            .addCase(signIn.rejected, (state, action) => {

                state.status = STATUS.error;
                state.user = action.error.message;

            })
            .addCase(signIn.fulfilled, (state, action) => {

                state.user = action.payload;
                state.status = STATUS.sucess;
                const token = action.payload?.data?.access_token;
                state.access_token = token;
                state.isLogin = true;
                localStorage.setItem("accesstoken", token);
                localStorage.setItem("info", JSON.stringify(action.payload));

            })

    }
})

export default userSlice.reducer;

export const { setUserNull,setUserData} = userSlice.actions;

export const signUp = createAsyncThunk("/users", async (userDetail, ThunkApi) => {


    const name = `${userDetail.first} ${userDetail.last}`;
    const email = userDetail.email;
    const password = userDetail.password;
    const data = await ServiceSignup({ name, email, password });

    return data;


})


export const signIn = createAsyncThunk("/users/signin", async (userDetail, ThunkApi) => {


    const email = userDetail.email;
    const password = userDetail.password;
    const data = await ServiceSignin({ email, password });

    return data;
})


