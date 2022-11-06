import { useCallback, useMemo, useState } from 'react';

const normalizeInitialValuesToBooleans = (initialValues) => {
	return Object.keys(initialValues).reduce((previous, current) => {
		return {
			...previous,
			[current]: false,
		};
	}, {});
};

export function useFormFields({ initialValues }) {
	const normalized = useMemo(() => {
		return normalizeInitialValuesToBooleans(initialValues);
	}, [initialValues]);

	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState(normalized);

	const onFieldUpdate = useCallback((name, value) => {
		setValues((previousForm) => {
			return {
				...previousForm,
				[name]: value,
			};
		});
	}, []);

	const toggleFieldError = useCallback((name, value) => {
		setErrors((previousErrors) => {
			return {
				...previousErrors,
				[name]: value,
			};
		});
	}, []);

	const hasError = useMemo(() => {
		const errorValues = Object.values(errors);
		return errorValues.some((errorValue) => errorValue);
	}, [errors]);

	return { values, hasError, toggleFieldError, onFieldUpdate };
}
