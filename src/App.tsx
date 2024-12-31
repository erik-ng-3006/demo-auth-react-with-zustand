import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';

const App = () => {
	const checkAuth = useAuthStore((state) => state.checkAuth);

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route
					path='/dashboard'
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				{/* Add more protected routes as needed */}
			</Routes>
		</BrowserRouter>
	);
};

export default App;
