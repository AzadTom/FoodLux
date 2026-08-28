import axios from 'axios';
export const BASE_URL = "https://foodlux-backend.vercel.app";
export const AUTHBASEURL = "https://nestjsserver.vercel.app";

// Users
const api = axios.create({
    baseURL: AUTHBASEURL,
});

api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accesstoken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => Promise.reject(error));


export const ServiceSignup = async ({ name, email, password }) => {

    try {
        const payload = {
            "username": name || "",
            "password": password || "",
            "email": email || "",
            "productName": "foodlux",
        }

        const response = await api.post(`/auth/signup`, payload, {
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

        const response = await api.post(`/auth/signin`, payload, {
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


export const getNewAccessToken = async () => {
    const response = await api.get('/auth/refresh-token');
    return response.data;
}

export const getUserProfile = async () => {
    const response = await api.get('/auth/user/me');
    return response.data;
}

// Products & Categories

const Local3 = "http://localhost:3001";
const Live3 = "https://nestjsserver.vercel.app";
export const BASE_URL3 = Local3;


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


export const SeriviceCategoryList = async () => {
    try {
        const response = await api2.get(`/product/categories`);
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
        const response = await api2.get(`/product/categories/${id}`);
        if (response.status === 200) {
            return response.data;
        }
        throw new Error("Something went wrong!");
    } catch (error) {
        console.error(error);
        throw new error;
    }
}


// Cart
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


// Wishlist

export const Service2Getfav = async () => {
    const response = await api2.get("/cart/favs/byuser");
    return response.data;
}
export const Service2Addtofav = async (productId) => {
    const response = await api2.post(`/cart/favs/create`, { productId });
    return response.data;
}
export const Service2Removetofav = async (productid) => {
    const response = await api2.delete(`/cart/favs/${productid}`)
    return response.data;
}

// Order
export const ServicegetOrderByUser = async () => {
    const response = await api2.get(`/order/byuser`);
    return response.data;
}

export const ServiceOrderCreatedByUser = async (payload) => {
    try {
        const response = await api2.post(`order/byuser`, payload);
        return {
            status: true,
            data: response.data
        };
    } catch (error) {
        return {
            status: false,
            data: { error }
        }
    }
}





