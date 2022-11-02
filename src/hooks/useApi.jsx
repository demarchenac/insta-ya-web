import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '@/api';

export function useApi(
	endpoint,
	{ success = '', error: _error = '' } = { success: '', error: '' },
) {
	const [isLoading, toggleLoading] = useState(false);
	const [wasFetched, toggleFetch] = useState(false);
	const [hasError, toggleError] = useState(false);
	const [data, setData] = useState({});

	const request = useCallback(async (body) => {
		toggleLoading(true);
		toggleFetch(true);
		toggleError(false);

		try {
			const response = await endpoint(body);
			setData(response.data.payload);
			toast(success, {
				delay: 5000,
				closeButton: true,
				draggable: false,
				type: 'success',
				position: 'bottom-left',
			});
		} catch (error) {
			setData({});
			toggleError(true);
			toast(api.parseError(error.response.data[0].code), {
				autoClose: false,
				closeButton: true,
				draggable: false,
				type: 'error',
				position: 'bottom-right',
			});
		} finally {
			toggleLoading(false);
		}
	}, []);

	return { wasFetched, isLoading, hasError, data, request };
}
