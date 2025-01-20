import api from '../api';

const UserService = {

    getUserProfile: async () => {
        try {
            const response = await api.get('/users/profile');
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to fetch profile';
            throw new Error(errorMessage);
        }
    },

    updateUserProfile: async (name, email) => {
        try {
            const response = await api.put('/users/profile', { name, email });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to update profile';
            throw new Error(errorMessage);
        }
    },

    updatePassword: async (oldPassword, newPassword) => {
        try {
            const response = await api.put('/users/password', { oldPassword, newPassword });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to update password';
            throw new Error(errorMessage);
        }
    },

    getUserOrders: async () => {
        try {
            const response = await api.get('/users/orders');
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to fetch orders';
            throw new Error(errorMessage);
        }
    },
};

export default UserService;
