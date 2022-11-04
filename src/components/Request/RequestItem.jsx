import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const colClasses = 'text-sm flex-1 text-center';

export function RequestItem({ request, isEven = false }) {
	const { serviceNumber, due, toCity, toAddress, state } = request;

	const formattedServiceNumber = `${serviceNumber}`.padStart(5, '0');

	const dueDate = new Date(due);
	const year = dueDate.getFullYear();
	const month = `${dueDate.getMonth() + 1}`.padStart(2, '0');
	const day = `${dueDate.getDate()}`.padStart(2, '0');

	const formattedDue = `${year}-${month}-${day}`;

	const formattedToAddress =
		toAddress.length > 17 ? toAddress.substring(0, 14) + '...' : toAddress;

	const formattedState =
		state.substring(0, 1).toUpperCase() + state.substring(1);

	const bgColor = isEven ? 'bg-gray-100' : '';

	return (
		<tr
			key={serviceNumber}
			className={`flex items-center space-x-5 p-2 py-4 w-full ${bgColor}`}
		>
			<td className={colClasses}>
				<Link className="text-indigo-600 cursor-pointer hover:underline">
					{formattedServiceNumber}
				</Link>
			</td>
			<td
				className={colClasses}
				title={`${formattedDue} ${dueDate.toLocaleTimeString()}`}
			>
				{formattedDue}
			</td>
			<td className={colClasses}>{toCity}</td>
			<td className={colClasses} title={toAddress}>
				{formattedToAddress}
			</td>
			<td className={colClasses}>{formattedState}</td>
		</tr>
	);
}

RequestItem.propTypes = {
	isEven: PropTypes.bool,
	request: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		serviceNumber: PropTypes.number.isRequired,
		due: PropTypes.string.isRequired,
		toCity: PropTypes.string.isRequired,
		toAddress: PropTypes.string.isRequired,
		state: PropTypes.oneOf(['guardado', 'cancelado', 'cumplido']),
	}).isRequired,
};
