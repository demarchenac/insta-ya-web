import { doRequest, parseFormData } from '@/api/utilities';
import { doFetch } from '@/api/utilities/doFetch';
import { findByService, updateByService } from '@/api/v1/request';
import { Divider } from '@/components/Divider';
import {
	UpdateRequestForm,
	formFields as updateRequestFields,
} from '@/components/Forms/UpdateRequestForm';
import { Logo } from '@/components/Logo';
import { Link, redirect, useLoaderData } from 'react-router-dom';

export async function loader({ params }) {
	try {
		const serviceNumber = params.serviceNumber;

		const response = await doFetch({
			endpoint: findByService,
			args: [serviceNumber],
		});

		const due = new Date(response.data.payload.due);
		const year = due.getFullYear().toString();
		const month = (due.getMonth() + 1).toString().padStart(2, '0');
		const date = due.getDate().toString().padStart(2, '0');
		const hours = due.getHours().toString().padStart(2, '0');
		const minutes = due.getMinutes().toString().padStart(2, '0');
		const seconds = due.getSeconds().toString().padStart(2, '0');

		const payload = {
			...response.data.payload,
			depth: response.data.payload.depth.toString(),
			height: response.data.payload.height.toString(),
			serviceNumber: response.data.payload.serviceNumber.toString(),
			weight: response.data.payload.weight.toString(),
			width: response.data.payload.width.toString(),

			dueDate: `${year}-${month}-${date}`,
			dueHour: `${hours}:${minutes}:${seconds}`,
		};

		delete payload.__v;
		delete payload.arrivedBefore24h;
		delete payload.due;
		delete payload.updatedAt;

		return payload;
	} catch (error) {
		if (!error.toasted) {
			throw error;
		}
	}
}

export async function action({ request, params }) {
	const formData = await request.formData();
	const body = parseFormData(formData, updateRequestFields);
	const serviceNumber = params.serviceNumber;

	body.isFragile = body.isFragile === 'true' ? true : false;

	const dueWithoutOffset = new Date(`${body.dueDate}T${body.dueHour}.000Z`);
	const due = new Date(
		dueWithoutOffset.getTime() +
			dueWithoutOffset.getTimezoneOffset() * 60 * 1000,
	);

	body.due = due.toISOString();

	try {
		await doRequest({
			body,
			endpoint: updateByService,
			args: [serviceNumber],
			success: 'Se ha actualizado su solicitud!',
		});

		return redirect('/client/requests');
	} catch (error) {
		if (!error.toasted) {
			throw error;
		}
	}
}

export function UpdateRequest() {
	const loaderData = useLoaderData();

	return (
		<section className="flex flex-col items-center justify-center px-6 py-8 h-screen">
			<div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-3xl">
				<div className="flex flex-col p-8 space-y-4">
					<div className="flex w-full justify-between">
						<h1 className="flex align-center text-2xl text-gray-900">
							<Logo spin /> &nbsp; - Actualizar Servicio #
							{loaderData.serviceNumber.padStart(5, '0')}
						</h1>
						<Link
							to="/client/requests"
							className="pt-2 text-slate-500 italic cursor-pointer hover:underline"
						>
							Volver
						</Link>
					</div>
					<Divider />

					<UpdateRequestForm initialValues={loaderData} />
				</div>
			</div>
		</section>
	);
}
