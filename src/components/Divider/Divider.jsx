import PropTypes from 'prop-types';

export function Divider({ title = null }) {
	return (
		<div className="bx-2 relative flex items-center mx-2">
			<div className="flex-grow border-t border-gray-200"></div>
			{title && <span className="mx-4 flex-shrink text-gray-900">{title}</span>}
			<div className="flex-grow border-t border-gray-200"></div>
		</div>
	);
}

Divider.propTypes = {
	title: PropTypes.string,
};
