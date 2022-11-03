import { Navigate, Outlet } from 'react-router-dom';
import { SignIn, action as signInAction } from './auth/SignIn';
import { SignUp, action as signUpAction } from './auth/SignUp';
import { Requests } from './client/Requests';

function RootLayout() {
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
			{
				path: 'client',
				children: [
					{ index: true, element: <Navigate to="/client/requests" replace /> },
					{
						path: 'requests',
						element: <Outlet />,
						children: [{ index: true, element: <Requests /> }],
					},
				],
			},
		],
	},
];
