import { privatePing, signIn, signUp } from './auth';
import { findAll } from './request';

export const v1 = {
	auth: { privatePing, signIn, signUp },
	requests: { findAll },
};
