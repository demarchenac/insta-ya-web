import PropTypes from 'prop-types';

const normalClasses = 'text-gray-900';
const errorClasses = 'text-red-600';

export function Label({ htmlFor, hasError = false, children }) {
	const dynamicClasses = hasError ? errorClasses : normalClasses;

	return (
		<label
			htmlFor={htmlFor}
			className={`block mb-2 text-sm font-medium cursor-pointer ${dynamicClasses}`}
		>
			{children}
		</label>
	);
}

Label.propTypes = {
	htmlFor: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
		.isRequired,
	hasError: PropTypes.bool,
};
