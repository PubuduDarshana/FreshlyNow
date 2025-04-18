// AuthService.js
import api from '../api';

const AUTH_ERRORS = {
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_EXISTS: 'Email already exists',
    SERVER_ERROR: 'Server error occurred',
    NETWORK_ERROR: 'Network error occurred'
};

const handleResponse = (response) => {
    if (!response.data) {
        throw new Error(AUTH_ERRORS.SERVER_ERROR);
    }
    return response.data;
};

const handleError = (error) => {
    console.error('Auth Error:', error);
    
    if (error.response?.status === 401) {
        throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);
    }
    
    if (error.response?.status === 409) {
        throw new Error(AUTH_ERRORS.EMAIL_EXISTS);
    }
    
    if (!error.response) {
        throw new Error(AUTH_ERRORS.NETWORK_ERROR);
    }

    throw new Error(error.response?.data?.message || AUTH_ERRORS.SERVER_ERROR);
};

const AuthService = {
    loginUser: async (data) => {
        try {
            const response = await api.post('/auth/login', {
                email: data.email,
                password: data.password
            });
            return handleResponse(response);
        } catch (error) {
            throw handleError(error);
        }
    },

    signupUser: async (data) => {
        try {
            const response = await api.post('/auth/signup', {
                name: data.name,
                email: data.email,
                password: data.password
            });
            return handleResponse(response);
        } catch (error) {
            throw handleError(error);
        }
    },

    validateToken: async () => {
        try {
            const response = await api.get('/auth/validate');
            return handleResponse(response);
        } catch (error) {
            throw handleError(error);
        }
    },

    logoutUser: () => {
        localStorage.removeItem('token');
        // Clear any other auth-related data from localStorage if needed
    }
};

export default AuthService;
