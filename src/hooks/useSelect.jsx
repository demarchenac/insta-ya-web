import { useEffect, useCallback, useState } from 'react';

export function useSelect({
	name,
	schema,
	initialValue = '',
	onUpdate,
	onError,
}) {
	const [isDirty, toggleDirty] = useState(false);
	const [wasTouched, toggleTouched] = useState(false);
	const [value, setValue] = useState(initialValue);
	const [error, setError] = useState(false);

	useEffect(() => {
		onUpdate(name, value);
	}, [onUpdate, name, value]);

	const handler = useCallback(
		(option) => {
			setValue(() => {
				if (initialValue === option.value) {
					toggleDirty(false);
				} else {
					toggleDirty(true);
				}

				toggleTouched(true);

				return option.value;
			});

			try {
				schema.parse(option.value);
				setError(false);
				onError(name, false);
			} catch (error) {
				setError(error.issues[0].message);
				onError(name, true);
			}
		},
		[name],
	);

	const onTouched = useCallback(() => {
		toggleTouched(true);
	}, []);

	return { value, wasTouched, isDirty, error, handler, onTouched };
}
