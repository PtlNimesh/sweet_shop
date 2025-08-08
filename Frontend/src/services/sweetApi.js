// src/services/sweetApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8086/api/sweets'; 

const sweetApi = {
    getAllSweets: async () => {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    },
    getSweetById: async (id) => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    },
    addSweet: async (sweet) => {
        const response = await axios.post(API_BASE_URL, sweet);
        return response.data;
    },
    updateSweet: async (id, sweet) => {
        const response = await axios.put(`${API_BASE_URL}/${id}`, sweet);
        return response.data;
    },
    deleteSweet: async (id) => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    },
    purchaseSweet: async (id, quantity) => {
        const response = await axios.post(`${API_BASE_URL}/${id}/purchase?quantity=${quantity}`);
        return response.data;
    },
    restockSweet: async (id, quantity) => {
        const response = await axios.post(`${API_BASE_URL}/${id}/restock?quantity=${quantity}`);
        return response.data;
    },
    searchSweets: async (searchTerm, searchBy, minPrice, maxPrice) => {
        const params = {
            searchTerm: searchTerm || '',
            searchBy: searchBy || '',
            minPrice: minPrice || 0,
            maxPrice: maxPrice || 0
        };
        const response = await axios.get(`${API_BASE_URL}/search`, { params });
        return response.data;
    },
    sortSweets: async (sortBy, order) => {
        const params = { sortBy, order };
        const response = await axios.get(`${API_BASE_URL}/sort`, { params });
        return response.data;
    }
};

export default sweetApi;