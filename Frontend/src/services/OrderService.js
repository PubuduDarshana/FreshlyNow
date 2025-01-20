// OrderService.js
import api from '../api';

const OrderService = {

    createOrder: async (cartItems) => {
        try {
            const response = await api.post('/order', { cartItems });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    getOrders: async () => {
        try {
            const response = await api.get('/order');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    updateOrderStatus: async (orderId, status) => {
        try {
            const response = await api.patch(`/order/${orderId}/status`, { status });
            return response.data;
        } catch (error) {
            console.error('Error updating order status:', error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                throw error.response.data;
            } else if (error.request) {
                // The request was made but no response was received
                throw new Error('No response from server');
            } else {
                // Something happened in setting up the request that triggered an Error
                throw new Error('Error setting up request');
            }
        }
    },

    getAllOrders: async () => {
        try {
            const response = await api.get('/order/all');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};

export default OrderService;