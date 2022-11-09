import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { LocalStorage } from '@/api/utilities';

export const ProtectedRoute = ({ route }) => {
	const hasSession = LocalStorage.hasSession();
	if (!hasSession) {
		return <Navigate to="/auth/sign-in" replace />;
	}

	return route;
};

ProtectedRoute.propTypes = {
	route: PropTypes.element,
};
