import { Navigate, Outlet, Route } from 'react-router-dom';
import { SignIn, action as signInAction } from './auth/SignIn';
import { SignUp, action as signUpAction } from './auth/SignUp';
import { Requests } from './client/Requests';

export function RootLayout() {
	return (
		<main className="w-screen h-screen bg-gray-100">
			<Outlet />
		</main>
	);
}

export const appRoutes = [
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{ index: true, element: <Navigate to="/auth" replace /> },
			{
				path: 'auth',
				children: [
					{ index: true, element: <Navigate to="/auth/sign-in" replace /> },
					{ path: 'sign-in', element: <SignIn />, action: signInAction },
					{ path: 'sign-up', element: <SignUp />, action: signUpAction },
				],
			},
		],
	},
];

export function AppRoutes() {
	return (
		<>
			<Route path="/">
				<Route index element={<Navigate to="/auth/sign-in" replace />} />

				{/* Auth routes */}
				<Route path="/auth/sign-in" element={<SignIn />} />
				<Route path="/auth/sign-up" element={<SignUp />} />

				{/* Client routes */}
				<Route path="client/requests" element={<Requests />} />

				{/* Fallback */}
				<Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
			</Route>
		</>
	);
}
