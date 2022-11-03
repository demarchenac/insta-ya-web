import { toast } from 'react-toastify';
import { parseError } from './parseError';

const accessTokenAlias = 'insta_ya-lemon_qid';
const sessionAlias = 'insta_ya-session';

export class LocalStoreService {
	signIn(access_token) {
		this.setAccessToken(access_token);
		this.setSession(true);
	}

	signOut(code) {
		this.removeAccessToken();
		this.setSession(false);

		toast(parseError(code), {
			autoClose: false,
			closeButton: true,
			draggable: false,
			type: 'error',
			position: 'bottom-right',
		});
	}

	setAccessToken(access_token) {
		localStorage.setItem(accessTokenAlias, access_token);
		this.setSession(true);
	}
	removeAccessToken() {
		localStorage.removeItem(accessTokenAlias);
	}

	setSession(state) {
		localStorage.setItem(sessionAlias, state);
	}

	getAccessToken() {
		return localStorage.getItem(accessTokenAlias);
	}

	hasSession() {
		return localStorage.getItem(sessionAlias);
	}
}

const localStorageService = new LocalStoreService();

export { localStorageService as LocalStorage };
