import { Link } from 'react-router-dom';
import { Button } from '../../Button';
import { Field } from '../FormComponents';

export function SignInForm() {
	return (
		<form className="flex flex-col space-y-6 w-full">
			<Field
				label="Correo electrónico"
				inputProps={{
					type: 'email',
					name: 'email',
					placeholder: 'usuario@dominio.com',
					required: true,
				}}
			/>

			<Field
				label="Contraseña"
				inputProps={{
					type: 'password',
					name: 'password',
					placeholder: '••••••••',
					required: true,
				}}
			/>

			<Button type="submit">Ingresar</Button>

			<p className="text-sm font-normal text-gray-500 ">
				¿No tienes cuenta? &nbsp;
				<Link
					to="/auth/sign-up"
					className="font-medium text-indigo-600 hover:underline "
				>
					Registrate!
				</Link>
			</p>
		</form>
	);
}
