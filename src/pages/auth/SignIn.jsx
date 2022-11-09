import { doRequest, LocalStorage, successMessages } from '@/api/utilities';
import { signIn } from '@/api/v1/auth';
import { redirect } from 'react-router-dom';
import { signInFields, SignInForm } from '../../components/Forms';
import { Logo } from '../../components/Logo';

export async function action({ request }) {
	try {
		const response = await doRequest({
			request,
			keys: signInFields,
			endpoint: signIn,
			success: successMessages.auth.signIn,
		});

		const token = response.data.payload.lemon_qid;
		LocalStorage.signIn(token);

		return redirect('/client/requests');
	} catch (error) {
		if (!error.toasted) {
			throw error;
		}
	}
}

export function SignIn() {
	return (
		<section className="flex flex-col items-center justify-center px-6 py-8 h-screen">
			<Logo />
			<div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-2xl">
				<div className="p-8 space-y-6">
					<h1 className="text-2xl font-bold text-gray-900">
						Formulario de Acceso
					</h1>
					<SignInForm />
				</div>
			</div>
		</section>
	);
}
