import { FormEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const navigate = useNavigate();
	const location = useLocation();
	const login = useAuthStore((state) => state.login);

	// Get the page we were trying to visit
	const from = location.state?.from?.pathname || '/';

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError('');

		try {
			await login(email, password);
			navigate(from, { replace: true });
		} catch (err) {
			setError('Login failed. Please check your credentials.');
		}
	};

	return (
		<div className='login-container'>
			<h1>Login</h1>
			{error && <div className='error'>{error}</div>}
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						id='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						id='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type='submit'>Login</button>
			</form>
		</div>
	);
};
