import { Navigate, Outlet } from 'react-router-dom';
import { LocalStorage } from '@/api/utilities';

export function ClientGuard() {
	const hasSession = LocalStorage.hasSession();

	// eslint-disable-next-line no-console
	console.log(`[ClientGuard] hasSession: ${hasSession}`);

	if (!hasSession) {
		// eslint-disable-next-line no-console
		console.log('abr');
		return <Navigate to="/auth/sign-in" replace />;
	} else {
		return <Outlet />;
	}
}
