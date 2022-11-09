import { useEffect, useCallback, useState } from 'react';

export function useField({
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
		(event) => {
			setValue(() => {
				if (initialValue === event.target.value) {
					toggleDirty(false);
				} else {
					toggleDirty(true);
				}

				toggleTouched(true);

				return event.target.value;
			});

			try {
				schema.parse(event.target.value);
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
