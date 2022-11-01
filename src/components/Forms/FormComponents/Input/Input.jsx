import PropTypes from 'prop-types';

const inputTypes = [
	'button',
	'checkbox',
	'color',
	'date',
	'datetime-local',
	'email',
	'file',
	'hidden',
	'image',
	'month',
	'number',
	'password',
	'radio',
	'range',
	'reset',
	'search',
	'submit',
	'tel',
	'text',
	'time',
	'url',
	'week',
];

export function Input({
	name,
	type = 'text',
	placeholder = '',
	required = false,
}) {
	return (
		<input
			type={type}
			name={name}
			id={name}
			className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5 focus:outline-none focus:ring-4 focus:ring-indigo-300"
			placeholder={placeholder}
			required={required}
		/>
	);
}

Input.propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.oneOf(inputTypes),
	required: PropTypes.bool,
	placeholder: PropTypes.string,
};
