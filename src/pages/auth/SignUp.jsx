import { doRequest, successMessages } from '@/api/utilities';
import { signUp } from '@/api/v1/auth';
import { redirect } from 'react-router-dom';
import { signUpFields, SignUpForm, signUpSchema } from '../../components/Forms';
import { Logo } from '../../components/Logo';

export async function action({ request }) {
	try {
		await doRequest({
			request,
			keys: signUpFields,
			schema: signUpSchema,
			endpoint: signUp,
			success: successMessages.auth.signUp,
		});

		return redirect('/auth/sign-in');
	} catch (error) {
		if (!error.toasted) {
			throw error;
		}
	}
}

export function SignUp() {
	return (
		<section className="flex flex-col items-center justify-center px-6 py-8 h-screen">
			<Logo />
			<div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-2xl">
				<div className="p-8 space-y-6">
					<h1 className="text-2xl font-bold text-gray-900">
						Formulario de Registro
					</h1>
					<SignUpForm />
				</div>
			</div>
		</section>
	);
}
