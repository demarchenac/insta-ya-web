import { SignInForm } from '../../components/Forms';
import { Logo } from '../../components/Logo';

export function SignIn() {
	return (
		<section className="bg-gray-50">
			<div className="flex flex-col items-center justify-center px-6 py-8 h-screen">
				<Logo />
				<div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-2xl">
					<div className="p-8 space-y-6">
						<h1 className="text-2xl font-bold text-gray-900">
							Formulario de Acceso
						</h1>
						<SignInForm />
					</div>
				</div>
			</div>
		</section>
	);
}
