import { useLottie } from 'lottie-react';
import EmptyAnimation from '@/assets/lotties/empty.json';

const lottieOptions = {
	animationData: EmptyAnimation,
	loop: true,
};

export function Empty() {
	const { View } = useLottie(lottieOptions);

	return (
		<div className="flex flex-col space-y-2 w-full items-center justify-center box-content">
			<div className="max-w-xs max-h-80">{View}</div>
			<span className="text-xl text-gray-400 mb-4 font-semibold italic">
				Sin resultados
			</span>
		</div>
	);
}
