import PropTypes from 'prop-types';

const buttonTypes = ['submit', 'reset', 'button'];

export function Button({ type = 'button', children }) {
	return (
		<button
			type={type}
			className="w-full text-sm font-medium px-5 py-2.5 text-white text-center bg-indigo-600 rounded-lg 
      hover:bg-indigo-800 focus:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-indigo-300"
		>
			{children}
		</button>
	);
}

Button.propTypes = {
	type: PropTypes.oneOf(buttonTypes),
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
		.isRequired,
};
