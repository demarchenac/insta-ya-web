import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DatepickerInput } from '../Datepicker';
import { Label } from '../Label';
import { useDatepicker } from '@/hooks/useDatepicker';

export function DatepickerField({
	label,
	datepickerProps,
	schema,
	initialValue = '',
	onUpdate = () => {},
	onError = () => {},
}) {
	const {
		name,
		placeholder,
		persistPicker = false,
		minDateTime,
		required,
	} = datepickerProps;

	const { value, error, wasTouched, isDirty, handler, onTouched } =
		useDatepicker({
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
			<DatepickerInput
				name={name}
				placeholder={placeholder}
				value={value}
				minDateTime={minDateTime}
				persistPicker={persistPicker}
				handler={handler}
				onOutsideClick={onTouched}
				hasError={hasError}
				required={required}
			/>
			<span className="pt-2 h-8 text-red-500">{hasError && errorText}</span>
		</div>
	);
}

DatepickerField.propTypes = {
	label: PropTypes.string.isRequired,
	schema: PropTypes.object.isRequired,
	datepickerProps: PropTypes.shape(DatepickerInput.propTypes).isRequired,
	initialValue: PropTypes.string,
	onUpdate: PropTypes.func,
	onError: PropTypes.func,
};
