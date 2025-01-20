import api from '../api';

const CartService = {
    
    addToCart: async (productId, quantity, userId) => {
        const response = await api.post('/cart', { productId, quantity, userId });
        return response.data;
    },
    getCart: async (userId) => {
        const response = await api.get(`/cart/${userId}`);
        return response.data;
    },
    removeFromCart: async (productId, userId) => {
        const response = await api.delete("/cart",{data:{productId:productId, userId:userId}});
        return response.data;
    },
    updateCart: async (productId, quantity, userId) => {
        const response = await api.put("/cart", { productId, quantity, userId });
        return response.data;
    },
};

export default CartService;
