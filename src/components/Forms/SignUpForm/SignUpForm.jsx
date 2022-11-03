import {
	Form,
	Link,
	useActionData,
	useNavigate,
	useNavigation,
} from 'react-router-dom';
import { z } from 'zod';
import { api } from '@/api';
import { useApi } from '@/hooks/useApi';
import { useFormFields } from '@/hooks/useFormFields';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { Button } from '../../Button';
import { Field } from '../FormComponents';

const formInitialValues = {
	name: 'aaa',
	lastName: 'bbb',
	password: '12345',
	passwordConfirmation: '12345',
	email: 'a@a.com',
};

export const formFields = [
	'name',
	'lastName',
	'password',
	'passwordConfirmation',
	'email',
];

export const fieldsSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'El nombre tiene mínimo 3 caracteres' })
		.max(50, { message: 'El nombre tiene máximo 50 caracteres' }),
	lastName: z
		.string()
		.min(3, { message: 'El apellido tiene mínimo 3 caracteres' })
		.max(50, { message: 'El apellido tiene máximo 50 caracteres' }),
	password: z
		.string()
		.min(5, { message: 'La contraseña tiene mínimo 5 caracteres' })
		.max(16, { message: 'La contraseña tiene máximo 16 caracteres' }),
	passwordConfirmation: z
		.string()
		.min(5, { message: 'La confirmación tiene mínimo 5 caracteres' })
		.max(16, { message: 'La confirmación tiene máximo 16 caracteres' }),
	email: z.string().email({ message: 'Correo electrónico inválido' }),
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

	const navigateTo = useNavigate();

	const { _isLoading, request } = useApi(api.v1.auth.signUp, {
		success: 'Se ha creado su usuario',
		onSuccess: () => navigateTo('/auth/sign-in'),
	});

	const { values, hasError, onFieldUpdate, toggleError } = useFormFields({
		initialValues: formInitialValues,
	});

	const { _success, _issue, submitForm } = useFormSubmission({
		request,
		submissionSchema: formSchema,
	});

	const _handleFormSubmit = async (event) => {
		event.preventDefault();

		await submitForm({ values, hasFieldErrors: hasError });
	};

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
					initialValue={formInitialValues.name}
					onUpdate={onFieldUpdate}
					onError={toggleError}
					inputProps={{
						name: 'name',
						placeholder: 'Gonzálo',
						required: true,
					}}
				/>

				<Field
					label="Apellido"
					schema={fieldsSchema.shape.lastName}
					initialValue={formInitialValues.lastName}
					onUpdate={onFieldUpdate}
					onError={toggleError}
					inputProps={{
						name: 'lastName',
						placeholder: 'Peréz',
						required: true,
					}}
				/>
			</div>

			<Field
				label="Correo electrónico"
				schema={fieldsSchema.shape.email}
				initialValue={formInitialValues.email}
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
				schema={fieldsSchema.shape.password}
				initialValue={formInitialValues.password}
				onUpdate={onFieldUpdate}
				onError={toggleError}
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
				initialValue={formInitialValues.passwordConfirmation}
				onUpdate={onFieldUpdate}
				onError={toggleError}
				inputProps={{
					type: 'password',
					name: 'passwordConfirmation',
					placeholder: '••••••••',
					required: true,
				}}
			/>
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
