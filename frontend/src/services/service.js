import axios from 'axios';

const Local = "http://localhost:5000";
const Live = "https://foodlux-backend.vercel.app";
export const BASE_URL = Live;



const Local2 = "http://localhost:3000";
const Live2 = "https://nestjsserver.vercel.app";
export const BASE_URL2 = Local2;

const Local3 = "http://localhost:3001";
const Live3 = "https://nestjsserver.vercel.app";
export const BASE_URL3 = Local3;



// Products

export const Serviceproducts = async () => {

    const response = await axios.get(`${BASE_URL}/products`, {
        headers: { "Content-Type": "application/json" },

    })

    return response.data;
}

export const SeriviceCategoryList = async () => {
    try {
        const response = await axios.get(`${BASE_URL3}/product/categories`);
        if (response.status === 200) {
            return response.data;
        }
        throw new Error("Something went wrong!");
    } catch (error) {
        console.error(error);
        throw new error;
    }
}

export const SeriviceEachCategoryList = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL3}/product/categories/${id}`);
        if (response.status === 200) {
            return response.data;
        }
        throw new Error("Something went wrong!");
    } catch (error) {
        console.error(error);
        throw new error;
    }
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

        const response = await axios.post(`${BASE_URL2}/auth/signup`, payload, {
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

        const response = await axios.post(`${BASE_URL2}/auth/signin`, payload, {
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

// UserInfo
const api = axios.create({
    baseURL: BASE_URL2,
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
    const response = await api.get(BASE_URL2 + '/auth/refresh-token');
    return response.data;
}


// Cart
const api2 = axios.create({
    baseURL: BASE_URL3,
});

api2.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accesstoken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => Promise.reject(error));

export const Service2GetCart = async () => {
    try {
        const response = await api2.get('/cart/byuser');
        if (response.status === 200) {
            return response.data;
        }
        throw new Error("something wrong in getCartlist!");
    } catch (error) {
        throw error;
    }
}

export const Service2AddCart = async (productId, quantity = 1) => {
    try {
        const payload = {
            productId: productId,
            quantity: quantity
        }
        const response = await api2.post('/cart/create', payload);
        if (response.status === 201) {
            return response.data;
        }
        throw new Error("something wrong in addCartlist!");
    } catch (error) {
        throw error;
    }

}

export const Service2RemoveFromCart = async (productId) => {
    try {

        const response = await api2.delete(`/cart/remove/${productId}`,);
        if (response.status === 200) {
            return response.data;
        }
        throw new Error("something wrong in addCartlist!");
    } catch (error) {
        throw error;
    }

}

export const Service2IncrementDecrement = async (productId, quantity = 1) => {
    try {

        const payload = {
            productId: productId,
            quantity: quantity
        }
        const response = await api2.patch(`/cart/update/${productId}`, payload);
        return response.data;

    } catch (error) {
        throw error;
    }
}


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

export const Service2Getfav = async () => {
    const response = await api2.get("/cart/favs/byuser");
    return response.data;
}
export const Service2Addtofav = async (productId) => {
    const response = await api2.post(`/cart/favs/create`,{productId});
    return response.data;
}
export const Service2Removetofav = async (productid) => {
    const response = await api2.delete(`/cart/favs/${productid}`)
    return response.data;
}


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






