import PropTypes from 'prop-types';

const normalClasses = 'text-gray-900';
const errorClasses = 'text-red-600';

const nonCheckboxClasses = 'mb-2 font-medium';
const forCheckboxClasses = 'ml-2 font-normal';

export function Label({
	htmlFor,
	hasError = false,
	isForCheckbox = false,
	onClick = () => {},
	children,
}) {
	const dynamicClasses = hasError ? errorClasses : normalClasses;

	const checkboxClasses = isForCheckbox
		? forCheckboxClasses
		: nonCheckboxClasses;

	return (
		<label
			htmlFor={htmlFor}
			onClick={onClick}
			className={`block text-sm cursor-pointer ${checkboxClasses} ${dynamicClasses}`}
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
	isForCheckbox: PropTypes.bool,
	onClick: PropTypes.func,
};
