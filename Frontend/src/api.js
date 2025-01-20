// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    },
    // Remove withCredentials if you're not using session cookies
    // withCredentials: true
});

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
            console.error('Error:', error);
            return Promise.reject(error);
        }
    );
}


export default api;