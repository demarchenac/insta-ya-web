import { useCallback, useState } from 'react';

export function useFormFields({ initialValues }) {
	const [hasError, toggleError] = useState(false);
	const [values, setValues] = useState(initialValues);

	const onFieldUpdate = useCallback((name, value) => {
		setValues((previousForm) => {
			return {
				...previousForm,
				[name]: value,
			};
		});
	}, []);

	return { values, hasError, toggleError, onFieldUpdate };
}
