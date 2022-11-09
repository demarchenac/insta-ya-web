import PropTypes from 'prop-types';

import styles from './Spinner.module.css';

export function Spinner({ size = 65 }) {
	return (
		<svg
			className={styles.spinner}
			width={`${size}px`}
			height={`${size}px`}
			viewBox="0 0 66 66"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				className={styles.path}
				fill="none"
				strokeWidth="6"
				strokeLinecap="round"
				cx="33"
				cy="33"
				r="30"
			/>
		</svg>
	);
}

Spinner.propTypes = {
	size: PropTypes.number,
};
