import { Route, Routes } from 'react-router-dom';
import { SignIn } from './auth/SignIn';
import { SignUp } from './auth/SignUp';

export function AppRouter() {
	return (
		<Routes>
			{/* Auth routes */}
			<Route path="/auth/sign-in" element={<SignIn />} />
			<Route path="/auth/sign-up" element={<SignUp />} />

			{/* Client routes */}
			<Route />
		</Routes>
	);
}
