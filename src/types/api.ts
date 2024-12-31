import axios from 'axios';
import { getAuthToken } from './auth';
import { useAuthStore } from '../stores/authStore';

export const api = axios.create({
	baseURL: 'https://api.your-backend.com',
});

api.interceptors.request.use((config) => {
	const token = getAuthToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			// Handle token expiration
			useAuthStore.getState().logout();
			window.location.href = '/login';
		}
		return Promise.reject(error);
	}
);
