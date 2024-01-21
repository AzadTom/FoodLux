import axios from 'axios';


const BASE_URL = "https://foodlux-backend.vercel.app";

export const Serviceproducts = async()=> {

    const response = await axios.get(`${BASE_URL}/products`,{
        headers:{"Content-Type":"application/json"},
        withCredentials:true
     })
    
    return response.data;
} 

export const ServiceSignup = async(userDetail)=>{

       
     const response = await axios.post(`${BASE_URL}/users/signup`,userDetail,{
        headers:{"Content-Type":"application/json"},
        withCredentials:true
     })

     return response.data;
}

export const ServiceSignin = async(userDetail)=>{

    const response = await axios.post(`${BASE_URL}/users/signin`,userDetail,{
        headers:{"Content-Type":"application/json"},
        withCredentials:true
     })

    return response.data;
}

export const ServiceUserProfile = async()=>{

     const   response = await axios.get(`${BASE_URL}/users/profile`,{
        headers:{"Content-Type":"application/json"},
        withCredentials:true
     })

     return response.data;
}