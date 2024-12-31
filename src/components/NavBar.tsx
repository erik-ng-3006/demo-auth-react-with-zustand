import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export const NavBar = () => {
	const { user, logout } = useAuthStore();

	return (
		<nav>
			{user ? (
				<>
					<span>Welcome, {user.name}!</span>
					<button onClick={logout}>Logout</button>
				</>
			) : (
				<Link to='/login'>Login</Link>
			)}
		</nav>
	);
};
