import { Navigate, Route, Routes } from 'react-router-dom';
import { SignIn } from './auth/SignIn';
import { SignUp } from './auth/SignUp';

export function AppRouter() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/auth/sign-in" replace />} exact />

			{/* Auth routes */}
			<Route path="/auth/sign-in" element={<SignIn />} />
			<Route path="/auth/sign-up" element={<SignUp />} />

			{/* Client routes */}
			<Route />

			{/* Fallback */}
			<Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
		</Routes>
	);
}
