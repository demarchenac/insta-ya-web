import PropTypes from 'prop-types';

import { Input } from '../Input';
import { Label } from '../Label';

export function Field({ label, inputProps }) {
	const { name, type, placeholder, required } = inputProps;

	return (
		<div className="flex flex-col w-full">
			<Label htmlFor={name}>{label}</Label>
			<Input
				name={name}
				type={type}
				placeholder={placeholder}
				required={required}
			/>
		</div>
	);
}

Field.propTypes = {
	label: PropTypes.string.isRequired,
	inputProps: PropTypes.shape(Input.propTypes).isRequired,
};
