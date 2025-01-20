import api from '../api'; // Import api module

const ProductService = {
    
    getProducts: async () => {
        const response = await api.get('/products'); // Adjust endpoint if needed
        return response.data;
    },

    getProduct: async (id) => {
        const response = await api.get(`/products/${id}`); // Adjust endpoint if needed
        return response.data;
    },

    addProduct: async (product) => {
        const response = await api.post('/products', product); // Adjust endpoint if needed
        return response.data;
    },

    updateProduct: async (id, product) => {
        try {
            const response = await api.put(`/products/${id}`, product);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    deleteProduct: async (id) => {
        const response = await api.delete(`/products/${id}`); // Adjust endpoint if needed
        return response.data;
    },

};

export default ProductService;
