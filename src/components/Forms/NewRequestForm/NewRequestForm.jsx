import { Form, useActionData, useNavigation } from 'react-router-dom';
import { z } from 'zod';
import { useFormFields } from '@/hooks/useFormFields';
import { Button } from '../../Button';
import { CheckboxField, Field, SelectField } from '../FormComponents';

const initialValues = {
	isFragile: false,
	width: '',
	height: '',
	depth: '',
	weight: '',
	due: '',
	state: '',
	fromCity: '',
	fromAddress: '',
	toCity: '',
	toAddress: '',
	toOwner: '',
	toOwnerId: '',
};

export const formFields = [
	'isFragile', // TODO: CHECKBOX FIELD
	'width',
	'height',
	'depth',
	'weight',
	'due', // TODO DATE & HOUR FIELDS
	'state',
	'fromCity',
	'fromAddress',
	'toCity',
	'toAddress',
	'toOwner',
	'toOwnerId',
];

const sharedNumberSchema = z
	.string()
	.min(1, {
		message: 'No puede estar vacío',
	})
	.refine((num) => !isNaN(num), { message: 'No es númerico' })
	.refine((num) => !isNaN(num) && parseInt(num) > 0, {
		message: 'Debe ser mayor a 0',
	});

export const fieldsSchema = z.object({
	isFragile: z.boolean(),
	width: sharedNumberSchema,
	height: sharedNumberSchema,
	depth: sharedNumberSchema,
	weight: sharedNumberSchema,
	due: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/, {
			message: 'Not a date',
		})
		.refine(
			(dueStr) => {
				const min = new Date(Date.now() + 24 * 60 * 60 * 1000); // plus 24h
				const due = new Date(dueStr);

				return due.getTime() >= min.getTime();
			},
			{ message: 'Too early!' },
		),
	state: z.enum(['guardado', 'cumplido']),
	fromCity: z
		.string()
		.min(3, { message: 'Mínimo 3 caracteres' })
		.max(50, { message: 'Máximo 50 caracteres' }),
	fromAddress: z
		.string()
		.min(3, { message: 'Mínimo 3 caracteres' })
		.max(100, { message: 'Máximo 100 caracteres' }),
	toCity: z
		.string()
		.min(3, { message: 'Mínimo 3 caracteres' })
		.max(50, { message: 'Máximo 50 caracteres' }),
	toAddress: z
		.string()
		.min(3, { message: 'Mínimo 3 caracteres' })
		.max(100, { message: 'Máximo 100 caracteres' }),
	toOwner: z
		.string()
		.min(3, { message: 'Mínimo 3 caracteres' })
		.max(50, { message: 'Máximo 50 caracteres' }),
	toOwnerId: z
		.string()
		.min(3, { message: 'Mínimo 3 dígitos' })
		.max(11, { message: 'Máximo 11 dígitos' })
		.refine((num) => !isNaN(num), { message: 'No es númerico' })
		.refine((num) => !isNaN(num) && parseInt(num) > 99, {
			message: 'Debe ser mayor a 99',
		}),
});

export function NewRequestForm() {
	const { state } = useNavigation();

	const isSubmitting = state === 'submitting';

	const actionData = useActionData();
	const { success } = actionData ?? { success: true, issue: '' };

	const { hasError, onFieldUpdate, toggleFieldError } = useFormFields({
		initialValues,
	});

	return (
		<Form
			className="flex flex-col pr-8 pl-2 space-y-6 w-full max-h-128 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-indigo-600 scrollbar-track-indigo-300"
			action="/client/requests/new"
			method="post"
		>
			{/* Destinatario */}
			<div className="flex space-x-4">
				<Field
					label="Destinatario - nombre"
					schema={fieldsSchema.shape.toOwner}
					initialValue={initialValues.toOwner}
					onUpdate={onFieldUpdate}
					onError={toggleFieldError}
					inputProps={{
						name: 'toOwner',
						placeholder: 'Juanito Perez',
						required: true,
					}}
				/>

				<Field
					label="Destinatario - CC/NIT"
					schema={fieldsSchema.shape.toOwnerId}
					initialValue={initialValues.toOwnerId}
					onUpdate={onFieldUpdate}
					onError={toggleFieldError}
					inputProps={{
						name: 'toOwnerId',
						placeholder: '12345678901',
						required: true,
					}}
				/>
			</div>

			{/* Entrega */}
			{/* <div className="flex space-x-4">
				<Field
					label="Entrega - Fecha"
					schema={fieldsSchema.shape.due}
					initialValue={initialValues.due}
					onUpdate={onFieldUpdate}
					onError={toggleError}
					inputProps={{
						name: 'due',
						placeholder: '2022-11-05',
						required: true,
					}}
				/>

				<Field
					label="Entrega - Hora"
					schema={fieldsSchema.shape.due}
					initialValue={initialValues.due}
					onUpdate={onFieldUpdate}
					onError={toggleError}
					inputProps={{
						name: 'due',
						placeholder: '15:35:00',
						required: true,
					}}
				/>
			</div> */}

			{/* Detalles */}
			<div className="flex space-x-4">
				<CheckboxField
					label="¿Es mercancía frágil?"
					checkboxProps={{ name: 'isFragile' }}
				/>

				<SelectField
					label="Estado"
					initialValue={initialValues.state}
					schema={fieldsSchema.shape.state}
					onUpdate={onFieldUpdate}
					onError={toggleFieldError}
					selectProps={{
						name: 'state',
						required: true,
						options: [
							{ value: 'guardado', display: 'Guardado' },
							{ value: 'cumplido', display: 'Cumplido' },
						],
					}}
				/>
			</div>

			{/* Especificaciones */}
			<div className="flex space-x-4">
				<Field
					label="Ancho (cm)"
					schema={fieldsSchema.shape.width}
					initialValue={initialValues.width}
					onUpdate={onFieldUpdate}
					onError={toggleFieldError}
					inputProps={{
						name: 'width',
						placeholder: '1',
						required: true,
					}}
				/>
				<Field
					label="Alto (cm)"
					schema={fieldsSchema.shape.height}
					initialValue={initialValues.height}
					onUpdate={onFieldUpdate}
					onError={toggleFieldError}
					inputProps={{
						name: 'height',
						placeholder: '1',
						required: true,
					}}
				/>
				<Field
					label="Profundidad (cm)"
					schema={fieldsSchema.shape.depth}
					initialValue={initialValues.depth}
					onUpdate={onFieldUpdate}
					onError={toggleFieldError}
					inputProps={{
						name: 'depth',
						placeholder: '1',
						required: true,
					}}
				/>

				<Field
					label="Peso (Kg)"
					schema={fieldsSchema.shape.weight}
					initialValue={initialValues.weight}
					onUpdate={onFieldUpdate}
					onError={toggleFieldError}
					inputProps={{
						name: 'weight',
						placeholder: '1',
						required: true,
					}}
				/>
			</div>

			{/* Origen */}
			<div className="flex space-x-4">
				<Field
					label="Origen - ciudad"
					schema={fieldsSchema.shape.fromCity}
					initialValue={initialValues.fromCity}
					onUpdate={onFieldUpdate}
					onError={toggleFieldError}
					inputProps={{
						name: 'fromCity',
						placeholder: 'Barranquilla',
						required: true,
					}}
				/>
				<Field
					label="Origen - dirección"
					schema={fieldsSchema.shape.fromAddress}
					initialValue={initialValues.fromAddress}
					onUpdate={onFieldUpdate}
					onError={toggleFieldError}
					inputProps={{
						name: 'fromAddress',
						placeholder: 'Km 5, Vía Puerto Colombia',
						required: true,
					}}
				/>
			</div>

			{/* Destino */}
			<div className="flex space-x-4">
				<Field
					label="Destino - ciudad"
					schema={fieldsSchema.shape.toCity}
					initialValue={initialValues.toCity}
					onUpdate={onFieldUpdate}
					onError={toggleFieldError}
					inputProps={{
						name: 'toCity',
						placeholder: 'Santa Marta',
						required: true,
					}}
				/>
				<Field
					label="Destino - dirección"
					schema={fieldsSchema.shape.toAddress}
					initialValue={initialValues.toAddress}
					onUpdate={onFieldUpdate}
					onError={toggleFieldError}
					inputProps={{
						name: 'toAddress',
						placeholder: 'Cl. 21 #2A-05',
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
					Generar solicitud
				</Button>
			</div>
		</Form>
	);
}
