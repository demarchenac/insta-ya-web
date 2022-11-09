import { useEffect } from 'react';

export function useOutsideClickWatcher(
	inRef,
	ref,
	callback,
	optionalRef = null,
	{ comesFromDatepicker = false } = { comesFromDatepicker: false },
) {
	useEffect(() => {
		// "click" event handler
		const handleOutsideClick = (event) => {
			if (!ref.current) {
				return;
			}

			const targetIsRef = ref.current.contains(event.target);

			if (inRef && !targetIsRef) {
				if (!optionalRef) {
					callback();
				} else {
					const targetIsOptionalRef = optionalRef.current.contains(
						event.target,
					);

					const previousMonth = document.getElementById(
						'datepicker-nav-previous',
					);
					const nextMonth = document.getElementById('datepicker-nav-next');

					const isPreviousMonth = event.target.id === 'datepicker-nav-previous';
					const isNextMonth = event.target.id === 'datepicker-nav-next';

					const optionalContainsPreviousMonth =
						previousMonth && optionalRef.current.contains(previousMonth);
					const optionalContainsNextMont =
						nextMonth && optionalRef.current.contains(nextMonth);

					const isNavigationButton =
						comesFromDatepicker &&
						(isPreviousMonth || isNextMonth) &&
						optionalContainsPreviousMonth &&
						optionalContainsNextMont;

					if (!targetIsOptionalRef && !isNavigationButton) {
						callback();
					}
				}
			}
		};

		// Event listener
		document.addEventListener('click', handleOutsideClick);
		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, [ref, inRef]);
}
