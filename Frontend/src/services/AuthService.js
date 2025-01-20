// AuthService.js
import api from '../api';

const handleResponse = (response) => {
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

const handleError = (error) => {
    console.error('Error:', error);
    const message =
        error.response?.data?.error || 
        (error.request ? 'Server is not responding. Please try again later.' : 'An error occurred.');
    throw new Error(message);
};


const AuthService = {
    
    loginUser: async (data) => {
        try {
            console.log('Attempting login with:', {
                email: data.email,
                passwordLength: data.password?.length
            });
            const response = await api.post('/auth/login', data);
            console.log('Login successful:', response.data);
            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
        
    },

    signupUser: async (data) => {
        try {
            console.log('Attempting signup with:', {
                name: data.name,
                email: data.email,
                passwordLength: data.password?.length
            });
            const response = await api.post('/auth/signup', data);
            console.log('Signup successful:', response.data);
            return handleResponse(response);
        } catch (error) {
            handleError(error);
        }
    }
};

export default AuthService;
