# React TypeScript Authentication Demo

A modern authentication implementation using React, TypeScript, Zustand, and React Router. This project demonstrates how to build a secure, type-safe authentication system with protected routes and persistent sessions.

## Features

This authentication demo showcases several important features needed in modern web applications:

- Type-safe authentication state management using Zustand
- Protected route implementation with React Router 6
- Persistent authentication with localStorage
- Axios interceptors for handling authenticated requests
- Loading states and error handling
- Automatic token management and renewal
- Route protection with redirect handling

## Technologies Used

- React 18
- TypeScript 5
- Zustand (State Management)
- React Router 6
- Axios (API Requests)
- Vite (Build Tool)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (v18 or higher)
- npm (v9 or higher)

## Getting Started

Follow these steps to get the project running on your local machine:

1. Clone the repository:
```bash
git clone https://github.com/yourusername/demo-auth-react-with-zustand.git
cd demo-auth-react-with-zustand
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the project root and add your configuration:
```env
VITE_API_URL=https://your-api-url.com
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
react-ts-auth-demo/
├── src/
│   ├── components/
│   │   ├── Login.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── Dashboard.tsx
│   │   └── NavBar.tsx
│   ├── stores/
│   │   └── authStore.ts
│   ├── types/
│   │   └── auth.ts
│   ├── utils/
│   │   ├── api.ts
│   │   └── auth.ts
│   ├── App.tsx
│   └── main.tsx
├── .env
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Authentication Flow

The authentication system follows these steps:

1. User attempts to access a protected route
2. If not authenticated, user is redirected to login page
3. After successful login:
   - Auth token is stored in localStorage
   - User data is saved in Zustand store
   - User is redirected to originally requested page
4. Protected routes check auth status before rendering
5. Axios interceptors automatically add auth headers to requests
6. Token expiration is handled gracefully with auto-logout

## API Integration

To connect this frontend to your backend, update the API configuration in `src/utils/api.ts`:

```typescript
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

Expected API endpoints:

- POST `/auth/login` - User login
- GET `/auth/me` - Get current user data
- POST `/auth/logout` - User logout
- POST `/auth/refresh` - Refresh authentication token

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Starts development server
- `npm run build` - Creates production build
- `npm run lint` - Runs ESLint
- `npm run preview` - Previews production build
- `npm run type-check` - Runs TypeScript compiler check

## Protected Routes

To protect a route, wrap it with the `ProtectedRoute` component:

```typescript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## Using the Auth Store

Access authentication state and methods in any component:

```typescript
import { useAuthStore } from '../stores/authStore';

function MyComponent() {
  const { user, login, logout } = useAuthStore();

  // Use auth state and methods
}
```

## Environment Variables

Required environment variables:

- `VITE_API_URL`: Backend API URL

Optional environment variables:

- `VITE_AUTH_STORAGE_KEY`: localStorage key for auth data (default: 'auth-storage')
- `VITE_TOKEN_REFRESH_INTERVAL`: Token refresh interval in minutes (default: 15)

## Security Considerations

This implementation includes several security best practices:

- Secure token storage in localStorage
- Automatic token renewal
- Protected route guards
- API request interceptors
- Error handling for unauthorized requests
- Type-safe authentication state
- Input validation and sanitization

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React Documentation](https://react.dev)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [React Router Documentation](https://reactrouter.com)

## Support

If you have any questions or need help with the implementation, please open an issue in the repository.

## Authors

- Erik Nguyen - [erik-ng-3006]

## Future Improvements

- Add social authentication
- Implement multi-factor authentication
- Add password reset functionality
- Add remember me feature
- Add session timeout handling
- Implement rate limiting
- Add unit and integration tests
