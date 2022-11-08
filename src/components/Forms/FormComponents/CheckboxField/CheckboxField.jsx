import { useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '../Checkbox';
import { Label } from '../Label';

export function CheckboxField({ label, initialValue = false, checkboxProps }) {
	const { name } = checkboxProps;
	const [selected, toggleSelected] = useState(initialValue);

	const onCheckHandler = () => {
		toggleSelected((previous) => !previous);
	};

	return (
		<div className="flex items-center w-full ">
			<Checkbox name={name} isSelected={selected} onCheck={onCheckHandler} />
			<Label htmlFor={name} isForCheckbox>
				{label}
			</Label>
		</div>
	);
}

CheckboxField.propTypes = {
	label: PropTypes.string.isRequired,
	initialValue: PropTypes.bool,
	checkboxProps: PropTypes.shape(Checkbox.propTypes).isRequired,
};
