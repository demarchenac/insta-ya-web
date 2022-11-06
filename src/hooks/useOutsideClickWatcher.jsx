import { useEffect } from 'react';

export function useOutsideClickWatcher(inRef, ref, callback) {
	useEffect(() => {
		// "click" event handler
		const handleOutsideClick = (event) => {
			if (!ref.current) {
				return;
			}

			const targetIsRef = ref.current.contains(event.target);

			if (inRef && !targetIsRef) {
				callback();
			}
		};

		// Event listener
		document.addEventListener('click', handleOutsideClick);
		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, [ref, inRef]);
}
