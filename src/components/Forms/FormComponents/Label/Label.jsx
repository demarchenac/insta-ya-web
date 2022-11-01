import PropTypes from 'prop-types';

export function Label({ htmlFor, children }) {
	return (
		<label
			htmlFor={htmlFor}
			className="block mb-2 text-sm font-medium text-gray-900 cursor-pointer"
		>
			{children}
		</label>
	);
}

Label.propTypes = {
	htmlFor: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
		.isRequired,
};
