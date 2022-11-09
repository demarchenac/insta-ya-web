import PropTypes from 'prop-types';

export function Checkbox({ name, isSelected, onCheck }) {
	return (
		<input
			id={name}
			name={name}
			type="checkbox"
			value={isSelected}
			checked={isSelected}
			onClick={onCheck}
			className="w-4 h-4 accent-indigo-600 bg-gray-100 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
			readOnly
		/>
	);
}

Checkbox.propTypes = {
	name: PropTypes.string,
	isSelected: PropTypes.bool,
	onCheck: PropTypes.func,
};
