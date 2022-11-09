import { toast } from 'react-toastify';
import { parseError } from './parseError';
import { parseFormData } from './parseFormData';

export async function doRequest({
	request,
	keys,
	schema = null,
	endpoint,
	success,
	body = null,
}) {
	let requestBody = body;

	if (!body) {
		const formData = await request.formData();
		requestBody = parseFormData(formData, keys);
	}

	// eslint-disable-next-line no-console
	console.log({ requestBody });

	if (schema) {
		const submission = schema.safeParse(requestBody);

		// eslint-disable-next-line no-console
		console.log({ submission });

		if (!submission.success) {
			return {
				success: false,
				issue: submission.error.issues[0].message,
			};
		}
	}

	try {
		const response = await endpoint(requestBody);

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
