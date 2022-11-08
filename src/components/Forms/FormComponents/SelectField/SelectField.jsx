import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Label } from '../Label';
import { Select } from '../Select';
import { useSelect } from '@/hooks/useSelect';

export function SelectField({
	label,
	selectProps,
	schema,
	initialValue,
	onUpdate,
	onError,
}) {
	const { persistOptions, name, required, options } = selectProps;

	const { value, error, wasTouched, isDirty, handler, onTouched } = useSelect({
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
			<Select
				name={name}
				initialValue={initialValue}
				options={options}
				required={required}
				hasError={hasError}
				persistOptions={persistOptions}
				handler={handler}
				onOutsideClick={onTouched}
			/>
			<span className="pt-2 h-8 text-red-500">{hasError && errorText}</span>
		</div>
	);
}

SelectField.propTypes = {
	label: PropTypes.string.isRequired,
	schema: PropTypes.object.isRequired,
	selectProps: PropTypes.shape(Select.propTypes).isRequired,
	initialValue: PropTypes.string,
	onUpdate: PropTypes.func,
	onError: PropTypes.func,
};
