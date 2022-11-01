import { Link } from 'react-router-dom';
import logo from '../../assets/react.svg';

export function Logo() {
	return (
		<Link
			to="/auth/sign-in"
			className="flex mb-6 text-2xl font-semibold text-gray-900 "
		>
			<img className="w-8 h-8 mr-2" src={logo} alt="React logo" />
			<span className="h-8">Insta Ya!</span>
		</Link>
	);
}
