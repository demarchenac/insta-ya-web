import { privatePing, signIn, signUp } from './auth';

export const v1 = {
	auth: { privatePing, signIn, signUp },
};
