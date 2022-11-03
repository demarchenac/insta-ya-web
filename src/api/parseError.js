export function parseError(code) {
	switch (code) {
		case 'user_already_exists':
			return 'Este usuario ya se encuentra registrado.';
		default:
			return 'Hubo un error en la solicitud, intente más tarde';
	}
}
