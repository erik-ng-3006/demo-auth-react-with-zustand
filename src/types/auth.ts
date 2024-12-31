import { useAuthStore } from '../stores/authStore';

export interface User {
	id: string;
	email: string;
	name: string;
}

export interface AuthState {
	user: User | null;
	token: string | null;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	checkAuth: () => Promise<void>;
}

export const isAuthenticated = (): boolean => {
	const user = useAuthStore.getState().user;
	return user !== null;
};

export const getAuthToken = (): string | null => {
	return useAuthStore.getState().token;
};

// Type guard for user object
export const isUser = (user: unknown): user is User => {
	return (
		typeof user === 'object' &&
		user !== null &&
		'id' in user &&
		'email' in user &&
		'name' in user
	);
};
