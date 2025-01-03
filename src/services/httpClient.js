// src/services/httpClient.js
import axios from 'axios';

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar token a las solicitudes
httpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer fcd80b458b1484a49414fec1d1bd5c37cef61efb554221fb8e7d6a75977a79fcfb91c8f2c8669cb92c649713a2fa4533dad448a8ae94628df7027330a0dbc5c6c530a37f3132cb6a3cdb4f18751c9698abac4031924ad5597ccb742a7f5fe621fbf15a37275b5bd1a461d11049b28647b0b3306f843f99a5015ba89f4b2e959a`;
    }
    return config;
});

// Interceptor para manejar errores
httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Manejo de errores global
        console.error(error);
        return Promise.reject(error);
    }
);

export default httpClient;
