import { base } from '../../utilities/axios';
import { v1Tag } from '../constants';

const controller = `/${v1Tag}/request`;

export const findAll = () =>
	new Promise((resolve, reject) => {
		base
			.get(`${controller}/find-all`)
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});
