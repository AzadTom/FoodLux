import axios from 'axios';


const Local = "http://localhost:5000";
const Live = "https://foodlux-backend.vercel.app";
export const BASE_URL = Live;



// export const Auth = "https://nestjsserver.vercel.app";
export const Auth = "http://localhost:3000";



// Products

export const Serviceproducts = async () => {

    const response = await axios.get(`${BASE_URL}/products`, {
        headers: { "Content-Type": "application/json" },

    })

    return response.data;
}


// Users
export const ServiceSignup = async ({ name, email, password }) => {

    try {
        const payload = {
            "username": name || "",
            "password": password || "",
            "email": email || "",
            "productName": "foodlux",
        }

        const response = await axios.post(`${Auth}/auth/signup`, payload, {
            headers: { "Content-Type": "application/json" },

        });

        if (response.status === 200 || response.status === 201) {
            if (response.data?.status === 400) {
                throw new Error(response.data?.message);
            }
            return response.data;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const ServiceSignin = async ({ email, password }) => {

    try {

        const payload = {
            email,
            password
        };

        const response = await axios.post(`${Auth}/auth/signin`, payload, {
            headers: { "Content-Type": "application/json" },

        })

        if (response.status === 200 || response.status === 201) {
            if (response.data?.status === 400) {
                throw new Error(response.data?.message);
            }
            return response.data;
        }

    } catch (error) {
        console.error(error);
        throw error;

    }

}

export const ServiceUserProfile = async () => {

    const response = await axios.get(`${BASE_URL}/users/profile`, {
        headers: { "Content-Type": "application/json" },


    })

    return response.data;
}


// UserInfo
const api = axios.create({
    baseURL: Auth,
});

api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accesstoken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => Promise.reject(error));


export const getUserProfile = async () => {
    const response = await api.get('/auth/user/me');
    return response.data;
}

export const getNewAccessToken = async () => {
    const response = await api.get(Auth + '/auth/refresh-token');
    return response.data;
}


// Cart

export const ServiceGetCart = async (token) => {

    const response = await axios.get(`${BASE_URL}/carts/`, {

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return response.data;
}


export const ServiceAddtocart = async (product, token) => {

    const response = await axios.post(`${BASE_URL}/carts/create`, product, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },


    })

    return response.data;
}


export const ServiceRemovetocart = async (productid, token) => {

    const response = await axios.delete(`${BASE_URL}/carts/${productid}`, {
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    })

    return response.data;

}


export const ServiceIncrementDecrement = async (qty, token, productid) => {

    const response = await axios.post(`${BASE_URL}/carts/${productid}`, { qty: qty }, {
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    })

    return response.data;

}


// Wishlist

export const ServiceGetfav = async (token) => {

    const response = await axios.get(`${BASE_URL}/favs/`, {

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    return response.data;
}


export const ServiceAddtofav = async (product, token) => {

    const response = await axios.post(`${BASE_URL}/favs/create`, product, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },


    })

    return response.data;
}


export const ServiceRemovetofav = async (productid, token) => {

    const response = await axios.delete(`${BASE_URL}/favs/${productid}`, {
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    })

    return response.data;

}






