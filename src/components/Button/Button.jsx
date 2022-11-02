import PropTypes from 'prop-types';

const buttonTypes = ['submit', 'reset', 'button'];

const normalClasses =
	'bg-indigo-600 hover:bg-indigo-800 focus:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-indigo-300';

const disabledClasses = 'bg-indigo-300 cursor-not-allowed';
const errorClasses =
	'bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300';

export function Button({
	type = 'button',
	hasError = false,
	disabled = false,
	children,
}) {
	let classes = hasError ? errorClasses : normalClasses;
	classes = disabled ? disabledClasses : classes;

	return (
		<button
			type={type}
			disabled={disabled}
			className={`w-full text-sm font-medium h-13 px-5 py-2.5 text-white text-center rounded-lg ${classes}`}
		>
			<div className="w-full flex align-center justify-center">{children}</div>
		</button>
	);
}

Button.propTypes = {
	hasError: PropTypes.bool,
	disabled: PropTypes.bool,
	type: PropTypes.oneOf(buttonTypes),
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
		.isRequired,
};
