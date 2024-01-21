import axios from 'axios';


const BASE_URL = "http://localhost:5000";

export const Serviceproducts = async()=> {

    const response = await axios.get(`${BASE_URL}/products`)
    
    return response.data;
} 