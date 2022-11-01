import { Link } from 'react-router-dom';
import { Button } from '../../Button';
import { Field } from '../FormComponents';

export function SignUpForm() {
	return (
		<form className="flex flex-col space-y-6 w-full">
			<div className="flex space-x-4">
				<Field
					label="Nombre"
					inputProps={{
						name: 'name',
						placeholder: 'Gonzálo',
						required: true,
					}}
				/>

				<Field
					label="Apellido"
					inputProps={{
						name: 'lastName',
						placeholder: 'Peréz',
						required: true,
					}}
				/>
			</div>

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

			<Field
				label="Confirmar contraseña"
				inputProps={{
					type: 'password',
					name: 'passwordConfirmation',
					placeholder: '••••••••',
					required: true,
				}}
			/>

			<Button type="submit">Terminar registro</Button>

			<p className="text-sm font-normal text-gray-500 ">
				¿Ya tienes una cuenta? &nbsp;
				<Link
					to="/auth/sign-in"
					className="font-medium text-indigo-600 hover:underline "
				>
					Inicia sesi&oacute;n!
				</Link>
			</p>
		</form>
	);
}
