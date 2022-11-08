import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useOutsideClickWatcher } from '@/hooks/useOutsideClickWatcher';

const inputTypes = [
	'color',
	'date',
	'datetime-local',
	'email',
	'file',
	'hidden',
	'image',
	'month',
	'number',
	'password',
	'radio',
	'range',
	'reset',
	'search',
	'submit',
	'tel',
	'text',
	'time',
	'url',
	'week',
];

const normalClasses =
	'border border-gray-300 focus:border-indigo-500 focus:ring-indigo-300';
const errorClasses = 'border border-red-500 focus:ring-red-300';

export function Input({
	name,
	value,
	handler,
	type = 'text',
	placeholder = '',
	required = false,
	hasError = false,
	onOutsideClick,
}) {
	const [isInInput, setInInput] = useState(false);

	const dynamicClasses = hasError ? errorClasses : normalClasses;

	const mouseDownHandler = () => {
		setInInput(true);
	};

	const resetInInput = useCallback(() => {
		setInInput(false);
	}, []);

	const ref = useRef(null);

	const outsideClickHandler = () => {
		resetInInput();
		onOutsideClick();
	};

	useOutsideClickWatcher(isInInput, ref, outsideClickHandler);

	return (
		<input
			className={`bg-gray-50 text-gray-900 rounded-lg w-full p-2.5 focus:outline-none focus:ring-4 ${dynamicClasses}`}
			ref={ref}
			type={type}
			name={name}
			id={name}
			required={required}
			placeholder={placeholder}
			value={value}
			onChange={handler}
			onMouseDown={mouseDownHandler}
		/>
	);
}

Input.propTypes = {
	name: PropTypes.string.isRequired,
	required: PropTypes.bool,
	hasError: PropTypes.bool,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	type: PropTypes.oneOf(inputTypes),
	handler: PropTypes.func,
	onOutsideClick: PropTypes.func,
};
