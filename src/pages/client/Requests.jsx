import { LocalStorage } from '@/api/utilities';
import { Logo } from '@/components/Logo';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function Requests() {
	const navigateTo = useNavigate();

	const signOutHandler = () => {
		LocalStorage.signOut();

		toast('Sesión cerrada!', {
			draggable: false,
			closeButton: false,
			type: 'success',
			position: 'bottom-left',
		});

		navigateTo('/auth/sign-in');
	};

	return (
		<section className="flex flex-col items-center justify-center px-6 py-8 h-screen">
			<div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-2xl">
				<div className="flex flex-col p-8 space-y-6">
					<div className="flex w-full justify-between">
						<h1 className="flex align-center text-2xl text-gray-900">
							<Logo /> &nbsp; - Solicitudes
						</h1>
						<span
							className="pt-2 text-red-500 italic cursor-pointer hover:underline"
							onClick={signOutHandler}
						>
							Cerrar sesi&oacute;n
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
