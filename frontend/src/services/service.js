import axios from 'axios';
 

const BASE_URL = "https://foodlux-backend.vercel.app";

// Products

export const Serviceproducts = async()=> {

    const response = await axios.get(`${BASE_URL}/products`,{
        headers:{"Content-Type":"application/json"},
        
    })
    
    return response.data;
} 


// Users

export const ServiceSignup = async(userDetail)=>{

       
     const response = await axios.post(`${BASE_URL}/users/signup`,userDetail,{
        headers:{"Content-Type":"application/json"},
        
    })

     return response.data;
}

export const ServiceSignin = async(userDetail)=>{

    const response = await axios.post(`${BASE_URL}/users/signin`,userDetail,{
        headers:{"Content-Type":"application/json"},
        
    })

    return response.data;
}

export const ServiceUserProfile = async()=>{

     const   response = await axios.get(`${BASE_URL}/users/profile`,{
        headers:{"Content-Type":"application/json"},
        
        
     })

     return response.data;
}

// Cart

export const ServiceGetCart = async(token)=>{

    const response = await axios.get(`${BASE_URL}/carts/`,{
         
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return response.data;
}


export const ServiceAddtocart =async(product,token)=>{

    const response = await axios.post(`${BASE_URL}/carts/create`,product,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`,
        },
        
        
     })

     return response.data;
}


export const ServiceRemovetocart = async(productid,token)=>{

    const response  = await axios.delete(`${BASE_URL}/carts/${productid}`,{
        headers:{"Content-Type":"application/json","Authorization":`Bearer ${token}`},
    })

     return response.data;

}






