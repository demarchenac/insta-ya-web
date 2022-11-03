import { toast } from 'react-toastify';
import { parseError } from './parseError';
import { parseFormData } from './parseFormData';

export async function doRequest({ request, keys, schema, endpoint, success }) {
	const formData = await request.formData();
	const body = parseFormData(formData, keys);
	const submission = schema.safeParse(body);

	if (!submission.success) {
		return {
			success: false,
			issue: submission.error.issues[0].message,
		};
	}

	// eslint-disable-next-line no-console
	console.log({ body, submission });

	try {
		const response = await endpoint(body);

		toast.dismiss();
		toast(success, {
			closeButton: false,
			draggable: false,
			type: 'success',
			position: 'bottom-left',
		});

		return response;
	} catch (error) {
		const errorCode = error?.response?.data[0]?.code;

		if (!errorCode) {
			throw error;
		}

		toast(parseError(errorCode), {
			autoClose: false,
			closeButton: true,
			draggable: false,
			type: 'error',
			position: 'bottom-right',
		});

		throw { ...error, toasted: true };
	}
}
