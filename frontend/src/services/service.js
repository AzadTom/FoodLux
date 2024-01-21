import axios from 'axios';


const BASE_URL = "https://foodlux-backend.vercel.app";

export const Serviceproducts = async()=> {

    const response = await axios.get(`${BASE_URL}/products`)
    
    return response.data;
} 