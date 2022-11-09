import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '../../../../hooks/useField';

import { Input } from '../Input';
import { Label } from '../Label';

export function Field({
	label,
	schema,
	inputProps,
	initialValue = '',
	onUpdate = () => {},
	onError = () => {},
}) {
	const { name, type, placeholder, required } = inputProps;

	const { value, error, wasTouched, isDirty, handler, onTouched } = useField({
		name,
		schema,
		initialValue,
		onUpdate,
		onError,
	});

	const isEmpty = value.length === 0;
	const isRequired = wasTouched && isEmpty && required;
	const hasError = isRequired || (isDirty && error && error.length > 0);
	const errorText = isRequired ? 'Campo requerido' : error;

	useEffect(() => {
		onError(name, hasError);
	}, [name, wasTouched, required, isDirty, error]);

	return (
		<div className="flex flex-col w-full ">
			<Label htmlFor={name} hasError={hasError}>
				{label}
			</Label>
			<Input
				name={name}
				type={type}
				required={required}
				placeholder={placeholder}
				value={value}
				handler={handler}
				hasError={hasError}
				onOutsideClick={onTouched}
			/>
			<span className="pt-2 h-8 text-red-500">{hasError && errorText}</span>
		</div>
	);
}

Field.propTypes = {
	label: PropTypes.string.isRequired,
	schema: PropTypes.object.isRequired,
	inputProps: PropTypes.shape(Input.propTypes).isRequired,
	initialValue: PropTypes.string,
	onUpdate: PropTypes.func,
	onError: PropTypes.func,
};
