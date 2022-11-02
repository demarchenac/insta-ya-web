import { Link } from 'react-router-dom';
import { z } from 'zod';
import { api } from '@/api';
import { Button } from '@/components/Button';
import { useFormFields } from '@/hooks/useForm';
import { Field } from '../FormComponents';

const formInitialValues = { email: '', password: '' };

const signInSchema = z.object({
	email: z.string().email({ message: 'Correo electrónico inválido' }),
	password: z
		.string()
		.min(5, { message: 'La contraseña tiene mínimo 5 caracteres' })
		.max(16, { message: 'La contraseña tiene máximo 16 caracteres' }),
});

export function SignInForm() {
	const { values, hasError, onFieldUpdate, toggleError } = useFormFields({
		initialValues: formInitialValues,
	});

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		if (hasError) {
			return;
		}

		// eslint-disable-next-line no-console
		console.log({ values });

		const response = await api.v1.auth.signIn();

		// eslint-disable-next-line no-console
		console.log({ response });
	};

	return (
		<form
			className="flex flex-col space-y-6 w-full"
			onSubmit={handleFormSubmit}
		>
			<Field
				label="Correo electrónico"
				schema={signInSchema.shape.email}
				onUpdate={onFieldUpdate}
				onError={toggleError}
				inputProps={{
					type: 'email',
					name: 'email',
					placeholder: 'usuario@dominio.com',
					required: true,
				}}
			/>

			<Field
				label="Contraseña"
				schema={signInSchema.shape.password}
				onUpdate={onFieldUpdate}
				onError={toggleError}
				inputProps={{
					type: 'password',
					name: 'password',
					placeholder: '••••••••',
					required: true,
				}}
			/>

			<Button type="submit" disabled={hasError}>
				Ingresar
			</Button>

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
