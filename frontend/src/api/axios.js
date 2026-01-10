import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000', // Direct to backend since we use tokens
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosClient;
