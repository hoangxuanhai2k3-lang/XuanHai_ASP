import axios from "axios";

const API_URL = "https://localhost:7132/api";

const homeService = {
    getCategories: async () => {
        const res = await axios.get(`${API_URL}/CategoriesProducts`);
        return res.data;
    },

    getProducts: async () => {
        const res = await axios.get(`${API_URL}/Products`);
        return res.data;
    },

    getPosts: async () => {
        const res = await axios.get(`${API_URL}/Posts`);
        return res.data;
    },

    searchProducts: async (keyword) => {
        const res = await axios.get(`${API_URL}/Products/search`, {
            params: { keyword: keyword }
        });
        return res.data;
    },
    getFeaturedProducts: async () => {
        const res = await axios.get(`${API_URL}/Products/featured`);
        return res.data;
    },
};

export default homeService;