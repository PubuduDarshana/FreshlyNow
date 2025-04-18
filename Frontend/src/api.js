// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor for API calls
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for API calls
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized errors
        if (error.response?.status === 401 && !originalRequest._retry) {
            // Dispatch unauthorized event for AuthContext to handle
            window.dispatchEvent(new CustomEvent('unauthorized', { 
                detail: { status: 401 } 
            }));
        }

        return Promise.reject(error);
    }
);

if (process.env.NODE_ENV === 'development') {
    api.interceptors.request.use(request => {
        console.log('Starting Request:', request);
        return request;
    });

    api.interceptors.response.use(
        response => {
            console.log('Response:', response);
            return response;
        },
        error => {
            console.error('Error:', error.response || error);
            return Promise.reject(error);
        }
    );
}

export default api;