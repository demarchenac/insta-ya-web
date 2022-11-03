import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { LocalStorage } from '@/api/utilities';

export const SessionRoute = ({ route }) => {
	const hasSession = LocalStorage.hasSession();
	if (hasSession) {
		return <Navigate to="/client/requests" replace />;
	}

	return route;
};

SessionRoute.propTypes = {
	route: PropTypes.element,
};
