import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { AuthState } from '../types/auth';

// We'll create an axios instance with a base URL
const api = axios.create({
	baseURL: 'https://api.your-backend.com',
});

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			loading: true,

			login: async (email: string, password: string) => {
				try {
					// Replace with your actual API endpoint
					const response = await api.post('/auth/login', {
						email,
						password,
					});

					const { user, token } = response.data;

					// Update our store with the authentication data
					set({ user, token, loading: false });

					// Set the token in axios defaults for subsequent requests
					api.defaults.headers.common[
						'Authorization'
					] = `Bearer ${token}`;
				} catch (error) {
					console.error('Login failed:', error);
					throw error;
				}
			},

			logout: () => {
				// Clear the authentication state
				set({ user: null, token: null });

				// Remove the token from axios defaults
				delete api.defaults.headers.common['Authorization'];
			},

			checkAuth: async () => {
				try {
					set({ loading: true });

					// Replace with your actual API endpoint
					const response = await api.get('/auth/me');
					const user = response.data;

					set({ user, loading: false });
				} catch (error) {
					set({ user: null, token: null, loading: false });
					console.error('Failed to check authentication:', error);
				}
			},
		}),
		{
			name: 'auth-storage', // Name for the persisted store
			partialize: (state) => ({ token: state.token }), // Only persist the token
		}
	)
);
