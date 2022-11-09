import { base } from '../../utilities/axios';
import { v1Tag } from '../constants';

const controller = `/${v1Tag}/auth`;

export const privatePing = () =>
	new Promise((resolve, reject) => {
		base
			.get(`${controller}/private-ping`)
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});

export const signIn = (body) =>
	new Promise((resolve, reject) => {
		base
			.post(`${controller}/sign-in`, body)
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});

export const signUp = (body) =>
	new Promise((resolve, reject) => {
		base
			.post(`${controller}/sign-up`, body)
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});
