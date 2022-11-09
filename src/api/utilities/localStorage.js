const accessTokenAlias = 'insta_ya-lemon_qid';
const sessionAlias = 'insta_ya-session';

export class LocalStoreService {
	signIn(access_token) {
		localStorage.setItem(accessTokenAlias, access_token);
		localStorage.setItem(sessionAlias, true);
	}

	signOut() {
		localStorage.removeItem(accessTokenAlias);
		localStorage.setItem(sessionAlias, false);
	}

	getToken() {
		return localStorage.getItem(accessTokenAlias);
	}

	hasSession() {
		return /true/.test(localStorage.getItem(sessionAlias));
	}
}

const localStorageService = new LocalStoreService();

export { localStorageService as LocalStorage };
