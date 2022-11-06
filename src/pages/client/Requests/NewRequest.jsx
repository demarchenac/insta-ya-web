import { parseFormData } from '@/api/utilities';
import { Divider } from '@/components/Divider';
import {
	NewRequestForm,
	formFields as newRequestFields,
} from '@/components/Forms/NewRequestForm';
import { Logo } from '@/components/Logo';
import { Link } from 'react-router-dom';

export async function action({ request }) {
	const formData = await request.formData();
	const body = parseFormData(formData, newRequestFields);
	body.isFragile = body.isFragile === 'true' ? true : false;

	// eslint-disable-next-line no-console
	console.log({ body });
}

export function NewRequest() {
	return (
		<section className="flex flex-col items-center justify-center px-6 py-8 h-screen">
			<div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-3xl">
				<div className="flex flex-col p-8 space-y-4">
					<div className="flex w-full justify-between">
						<h1 className="flex align-center text-2xl text-gray-900">
							<Logo spin /> &nbsp; - Nueva Solicitud
						</h1>
						<Link
							to="/client/requests"
							className="pt-2 text-slate-500 italic cursor-pointer hover:underline"
						>
							Volver
						</Link>
					</div>
					<Divider />

					<NewRequestForm />
				</div>
			</div>
		</section>
	);
}
