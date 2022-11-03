import axios from 'axios';
// import { toast } from 'react-toastify';
// import { LocalStorage } from './localStorage';
// import { parseError } from './parseError';

const baseConfig = {
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
};

const base = axios.create({
	...baseConfig,
	baseURL: import.meta.env.VITE_API_URL,
});

// const refresh = axios.create({
// 	...baseConfig,
// 	baseURL: `${import.meta.env.API_URL}/v1/auth/refresh`,
// });

// base.interceptors.request.use((config) => {
// 	const token = LocalStorage.getAccessToken();
// 	if (token) {
// 		config.headers['Authorization'] = `Bearer ${token}`;
// 	}
// 	return config;
// });

// refresh.interceptors.response.use(
// 	(res) => res,
// 	(error) => {
// 		if (error.response.status === 403) {
// 			LocalStorage.signOut(error.response.data[0].code);
// 			history.push('/auth/login');
// 			return Promise.reject(error);
// 		} else {
// 			return Promise.reject(error);
// 		}
// 	},
// );

// base.interceptors.response.use(
// 	(res) => res,
// 	(error) => {
// 		let requestMade = { ...error.config };
// 		if (error.response.status === 401 && !requestMade._retry) {
// 			requestMade._retry = true;
// 			return refresh.post().then((res) => {
// 				if (res.status === 200) {
// 					LocalStorage.signIn(res.data.access_token);
// 					requestMade.headers[
// 						'Authorization'
// 					] = `Bearer ${res.data.access_token}`;
// 					return axios(requestMade);
// 				}
// 			});
// 		} else if (error.response.status === 403) {
// 			if (
// 				error.response.data.detail ===
// 				'Authentication credentials were not provided.'
// 			) {
// 				localStorage.removeAccessToken();
// 				Common.fireMiniMessage('Sesión caducada, inice sesión nuevamente...');
// 				history.push('/auth/login');
// 			} else {
// 				Swal.fire({
// 					title: 'Error!',
// 					text: error.response.data.detail,
// 					icon: 'error',
// 					confirmButtonText: 'Ok',
// 				});
// 			}
// 		} else if (error?.response?.data?.message === 'Invalid date range') {
// 			return error.response;
// 		} else if (error.response.status >= 400) {
// 			const errKeys = Object.keys(error.response.data);
// 			const errMessage = errKeys.map((key) => {
// 				const errValue = error.response.data[key];
// 				if (typeof errValue === 'string') {
// 					return error.response.data[key];
// 				} else {
// 					return error.response.data[key].join(' <br/> ');
// 				}
// 			});

// 			Swal.fire({
// 				title: 'Error!',
// 				html: errMessage,
// 				icon: 'error',
// 				confirmButtonText: 'Ok',
// 			});
// 		}
// 	},
// );

export { base };
