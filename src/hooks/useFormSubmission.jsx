import { useCallback, useState } from 'react';

export function useFormSubmission({ submissionSchema = null, request }) {
	const [{ success, issue }, setFormCheck] = useState({
		success: true,
		issue: '',
	});

	const submitForm = useCallback(async ({ values, hasFieldErrors }) => {
		if (hasFieldErrors) {
			return null;
		}

		if (submissionSchema) {
			const submitParse = submissionSchema.safeParse(values);
			if (!submitParse.success) {
				setFormCheck({
					success: false,
					issue: submitParse.error.issues[0].message,
				});
				return null;
			} else {
				setFormCheck({
					success: true,
					issue: '',
				});

				return await request(values);
			}
		} else {
			return await request(values);
		}
	}, []);

	return { success, issue, submitForm };
}
