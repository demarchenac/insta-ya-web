import { Link } from 'react-router-dom';
import { LocalStorage } from '@/api/utilities';

import logo from '../../assets/react.svg';

export function Logo() {
	const to = LocalStorage.hasSession() ? '/client/requests' : '/auth/sign-in';

	return (
		<Link to={to} className="flex mb-6 text-2xl font-semibold text-gray-900 ">
			<img className="w-8 h-8 mr-2" src={logo} alt="React logo" />
			<span className="h-8">Insta Ya!</span>
		</Link>
	);
}
