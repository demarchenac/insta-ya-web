import { Form, Link, useActionData, useNavigation } from 'react-router-dom';
import { z } from 'zod';
import { useFormFields } from '@/hooks/useFormFields';
import { Button } from '../../Button';
import { Field } from '../FormComponents';

const initialValues = {
	name: '',
	lastName: '',
	email: '',
	identificationNumber: '',
	password: '',
	passwordConfirmation: '',
};

export const formFields = [
	'name',
	'lastName',
	'email',
	'identificationNumber',
	'password',
	'passwordConfirmation',
];

export const fieldsSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Mínimo 3 caracteres' })
		.max(50, { message: 'Máximo 50 caracteres' }),
	lastName: z
		.string()
		.min(3, { message: 'Mínimo 3 caracteres' })
		.max(50, { message: 'Máximo 50 caracteres' }),
	email: z.string().email({ message: 'Correo electrónico inválido' }),
	identificationNumber: z
		.string()
		.min(3, { message: 'Mínimo 3 dígitos' })
		.max(11, { message: 'Máximo 11 dígitos' })
		.refine((num) => !isNaN(num), { message: 'El valor no es númerico' })
		.refine((num) => !isNaN(num) && parseInt(num) > 99, {
			message: 'El valor mínimo es 100',
		}),
	password: z
		.string()
		.min(5, { message: 'Mínimo 5 caracteres' })
		.max(16, { message: 'Máximo 16 caracteres' }),
	passwordConfirmation: z
		.string()
		.min(5, { message: 'Mínimo 5 caracteres' })
		.max(16, { message: 'Máximo 16 caracteres' }),
});

export const formSchema = fieldsSchema.refine(
	({ password, passwordConfirmation }) =>
		password && passwordConfirmation ? password === passwordConfirmation : true,
	{
		message: 'Las contraseñas no coinciden',
	},
);

export function SignUpForm() {
	const { state } = useNavigation();

	const isSubmitting = state === 'submitting';

	const actionData = useActionData();
	const { success, issue } = actionData ?? { success: true, issue: '' };

	const { hasError, onFieldUpdate, toggleFieldError } = useFormFields({
		initialValues,
	});

	return (
		<Form
			className="flex flex-col space-y-6 w-full"
			action="/auth/sign-up"
			method="post"
		>
			<div className="flex space-x-4">
				<Field
					label="Nombre"
					schema={fieldsSchema.shape.name}
					initialValue={initialValues.name}
					onUpdate={onFieldUpdate}
					onError={toggleFieldError}
					inputProps={{
						name: 'name',
						placeholder: 'Gonzálo',
						required: true,
					}}
				/>

				<Field
					label="Apellido"
					schema={fieldsSchema.shape.lastName}
					initialValue={initialValues.lastName}
					onUpdate={onFieldUpdate}
					onError={toggleFieldError}
					inputProps={{
						name: 'lastName',
						placeholder: 'Peréz',
						required: true,
					}}
				/>
			</div>

			<div className="flex space-x-4">
				<Field
					label="Correo electrónico"
					schema={fieldsSchema.shape.email}
					initialValue={initialValues.email}
					onUpdate={onFieldUpdate}
					onError={toggleFieldError}
					inputProps={{
						type: 'email',
						name: 'email',
						placeholder: 'usuario@dominio.com',
						required: true,
					}}
				/>
				<Field
					label="CC/NIT"
					schema={fieldsSchema.shape.identificationNumber}
					initialValue={initialValues.identificationNumber}
					onUpdate={onFieldUpdate}
					onError={toggleFieldError}
					inputProps={{
						name: 'identificationNumber',
						placeholder: '12345678901',
						required: true,
					}}
				/>
			</div>

			<div className="flex space-x-4">
				<Field
					label="Contraseña"
					schema={fieldsSchema.shape.password}
					initialValue={initialValues.password}
					onUpdate={onFieldUpdate}
					onError={toggleFieldError}
					inputProps={{
						type: 'password',
						name: 'password',
						placeholder: '••••••••',
						required: true,
					}}
				/>

				<Field
					label="Confirmar contraseña"
					schema={fieldsSchema.shape.passwordConfirmation}
					initialValue={initialValues.passwordConfirmation}
					onUpdate={onFieldUpdate}
					onError={toggleFieldError}
					inputProps={{
						type: 'password',
						name: 'passwordConfirmation',
						placeholder: '••••••••',
						required: true,
					}}
				/>
			</div>

			<div className="flex flex-col">
				<Button
					type="submit"
					disabled={hasError || isSubmitting}
					hasError={!success}
					isLoading={isSubmitting}
				>
					Terminar registro
				</Button>

				<span className="mt-2 h-8 text-red-500">{!success && issue}</span>
			</div>

			<p className="text-sm font-normal text-gray-500 ">
				¿Ya tienes una cuenta? &nbsp;
				<Link
					to="/auth/sign-in"
					className="font-medium text-indigo-600 hover:underline "
				>
					Inicia sesi&oacute;n!
				</Link>
			</p>
		</Form>
	);
}
