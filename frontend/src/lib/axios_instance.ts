import axios, {type AxiosInstance } from 'axios';
import { isTokenExpired } from '@/lib/utils';

// funkcja tworzy instancję Axios z interceptorem dołączającym token
const createProtectedApi = (baseURL: string): AxiosInstance => {
    const api = axios.create({
        baseURL: baseURL,
    });

    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                if (isTokenExpired(token)) {
                    console.warn('Token wygasł. Wylogowywanie...');
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    return Promise.reject(new Error('Token expired'));
                }
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return api;
};

// Ta funkcja tworzy instancję Axios bez interceptora
const createPublicApi = (baseURL: string): AxiosInstance => {
    return axios.create({
        baseURL: baseURL,
    });
};

// Instancje dla konkretnych serwisów
export const authApi = createPublicApi('http://localhost:2000');
export const trainerClientApi = createProtectedApi('http://localhost:2137');
export const plansExercisesApi = createProtectedApi('http://localhost:8080');