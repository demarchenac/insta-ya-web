export function parseError(code) {
	switch (code) {
		case 'user_already_exists':
			return 'No se pudo registrar al usuario.';
		default:
			return 'Hubo un error en la solicitud, intente más tarde';
	}
}
