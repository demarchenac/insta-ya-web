import { toast } from 'react-toastify';
import { parseError } from './parseError';

export async function doFetch({ endpoint }) {
	try {
		const response = await endpoint();
		return response;
	} catch (error) {
		const errorCode = error?.response?.data[0]?.code;

		if (!errorCode) {
			throw error;
		}

		if (error.config.handledByRefresh) {
			throw { ...error, toasted: true };
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
