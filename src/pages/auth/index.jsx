import { Navigate, Outlet } from 'react-router-dom';
import { LocalStorage } from '@/api/utilities';

export function AuthGuard() {
	const hasSession = LocalStorage.hasSession();

	// eslint-disable-next-line no-console
	console.log(`[AuthGuard] hasSession: ${hasSession}`);

	if (hasSession) {
		return <Navigate to="/client/requests" replace />;
	} else {
		return <Outlet />;
	}
}
