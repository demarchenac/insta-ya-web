import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useOutsideClickWatcher } from '@/hooks/useOutsideClickWatcher';
import { Datepicker } from './Datepicker';

const normalClasses =
	'border border-gray-300 focus:border-indigo-500 focus:ring-indigo-300';
const errorClasses = 'border border-red-500 focus:ring-red-300';

export function DatepickerInput({
	name,
	value,
	required = false,
	hasError = false,
	persistPicker = false,
	minDateTime = null,
	placeholder = '',
	handler = () => {},
	onOutsideClick = () => {},
}) {
	const [showDatepicker, toggleDatepicker] = useState(false);
	const [isInDatepicker, toggleInDatepicker] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);

	const ref = useRef();
	const datepickerRef = useRef();

	const outsideClickHandler = () => {
		toggleInDatepicker(false);
		toggleDatepicker(false);
		onOutsideClick();
	};

	useOutsideClickWatcher(
		isInDatepicker,
		ref,
		outsideClickHandler,
		datepickerRef,
		{
			comesFromDatepicker: true,
		},
	);

	const dynamicClasses = hasError ? errorClasses : normalClasses;

	const inputClickHandler = () => {
		toggleDatepicker((previousOptions) => {
			toggleInDatepicker(!previousOptions);
			return !previousOptions;
		});
	};

	const datePickedHandler = (selectedDate) => {
		setSelectedDate(selectedDate);

		const year = selectedDate.getFullYear();
		const month = `${selectedDate.getMonth() + 1}`.padStart(2, '0');
		const date = `${selectedDate.getDate()}`.padStart(2, '0');

		handler(`${year}-${month}-${date}`);

		if (!persistPicker) {
			toggleInDatepicker(false);
			toggleDatepicker(false);
		}
	};

	return (
		<>
			<input
				id={name}
				ref={ref}
				type="text"
				name={name}
				placeholder={placeholder}
				value={value}
				className={`bg-gray-50 text-gray-900 flex justify-between items-center rounded-lg w-full p-2.5 cursor-pointer focus:outline-none focus:ring-4 ${dynamicClasses}`}
				onClick={inputClickHandler}
				required={required}
				readOnly
			/>
			{showDatepicker && (
				<div className="relative" ref={datepickerRef}>
					<Datepicker
						className="absolute top-3"
						minDateTime={minDateTime}
						handler={datePickedHandler}
						selectedDate={selectedDate}
					/>
				</div>
			)}
		</>
	);
}

DatepickerInput.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
	required: PropTypes.bool,
	hasError: PropTypes.bool,
	persistPicker: PropTypes.bool,
	minDateTime: PropTypes.number,
	placeholder: PropTypes.string,
	handler: PropTypes.func,
	onOutsideClick: PropTypes.func,
};
