export function parseError(code) {
	switch (code) {
		case 'user_already_exists':
			return 'Este usuario ya se encuentra registrado';
		case 'user_not_found':
			return 'Correo o contraseña erroneos';
		case 'session_expired':
			return 'La sesión expiro';
		default:
			return `[${code}]: Hubo un error en la solicitud, intente más tarde'`;
	}
}
