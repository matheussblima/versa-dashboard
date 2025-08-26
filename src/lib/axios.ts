import axios from 'axios';

const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('auth_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        console.error('Erro na requisição:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log('Resposta recebida:', response.status, response.config.url);
        return response;
    },
    (error) => {

        if (error.response?.status === 401) {
            console.error('Não autorizado - verificar autenticação');
        } else if (error.response?.status === 403) {
            console.error('Acesso negado');
        } else if (error.response?.status >= 500) {
            console.error('Erro interno do servidor');
        }

        return Promise.reject(error);
    }
);

export default api;
