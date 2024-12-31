import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

interface ProtectedRouteProps {
	children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { user, loading } = useAuthStore();
	const location = useLocation();

	// Show loading state while checking authentication
	if (loading) {
		return <div>Loading...</div>;
	}

	// Redirect to login if user is not authenticated
	if (!user) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	return <>{children}</>;
};
