import axios from 'axios';
import { toast } from 'react-toastify';
import { router } from '@/App';
import { LocalStorage } from './localStorage';
import { parseError } from './parseError';

const sharedConfig = {
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
};

const refresh = axios.create({
	...sharedConfig,
	baseURL: `${import.meta.env.VITE_API_URL}/v1/auth/refresh`,
});

refresh.interceptors.response.use(
	(res) => res,
	(error) => {
		// eslint-disable-next-line no-console
		console.log('[REFRESH API] error handler');
		// eslint-disable-next-line no-console
		console.log({ response: error.response });

		if (error.response.status === 403) {
			LocalStorage.signOut();
			toast(parseError(error.response.data[0].code), {
				autoClose: false,
				closeButton: true,
				draggable: false,
				type: 'error',
				position: 'bottom-right',
			});
			router.navigate('/auth/sign-in', { replace: true });
		}

		error.config.handledByRefresh = true;

		throw error;
	},
);

const base = axios.create({
	...sharedConfig,
	baseURL: import.meta.env.VITE_API_URL,
});

base.interceptors.request.use((config) => {
	const token = LocalStorage.getToken();
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}
	return config;
});

base.interceptors.response.use(
	(res) => res,
	async (error) => {
		let requestMade = { ...error.config, ...sharedConfig };
		if (error.response.status === 401 && !requestMade._retry) {
			requestMade._retry = true;
			const refreshResponse = await refresh.post();

			if (refreshResponse.status === 200) {
				const token = refreshResponse.data.payload.lemon_qid;

				LocalStorage.signIn(token);
				requestMade.headers['Authorization'] = `Bearer ${token}`;

				const response = await axios(requestMade);
				return response;
			}
			// eslint-disable-next-line no-console
			console.log(error);
		} else if (error.response.status >= 400) {
			throw error;
		} else {
			throw error;
		}
	},
);

export { base };
