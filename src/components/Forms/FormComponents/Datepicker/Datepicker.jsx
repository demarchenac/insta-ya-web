import { useState } from 'react';
import { useDatepicker, START_DATE } from '@datepicker-react/hooks';
import PropTypes from 'prop-types';
import { DatepickerContext } from './context';
import { Month } from './Month';

export function Datepicker({
	className = '',
	minDateTime = null,
	selectedDate = null,
	handler = () => {},
}) {
	const [state, setState] = useState(
		{
			startDate: selectedDate,
			endDate: selectedDate,
			focusedInput: START_DATE,
		},
		[selectedDate],
	);

	const handleDateChange = (data) => {
		setState({ ...data, endDate: data.startDate, focusedInput: START_DATE });
		handler(data.startDate);
	};

	const {
		firstDayOfWeek,
		activeMonths,
		isDateSelected,
		isDateHovered,
		isFirstOrLastSelectedDate,
		isDateBlocked,
		isDateFocused,
		focusedDate,
		onDateHover,
		onDateSelect,
		onDateFocus,
		goToPreviousMonths,
		goToNextMonths,
	} = useDatepicker({
		startDate: state.startDate,
		endDate: state.endDate,
		focusedInput: state.focusedInput,
		onDatesChange: handleDateChange,
		numberOfMonths: 1,
		minBookingDate: minDateTime ? new Date(minDateTime) : null,
	});

	return (
		<DatepickerContext.Provider
			value={{
				focusedDate,
				isDateFocused,
				isDateSelected,
				isDateHovered,
				isDateBlocked,
				isFirstOrLastSelectedDate,
				onDateSelect,
				onDateFocus,
				onDateHover,
			}}
		>
			<div
				className={`flex flex-col bg-gray-50 border-gray-300 items-center rounded-lg shadow-md ${className}`}
			>
				<div className="p-4 grid grid-cols-calendarMonth gap-16">
					{activeMonths.map((month) => (
						<Month
							key={`${month.year}-${month.month}`}
							year={month.year}
							month={month.month}
							minDateTime={minDateTime}
							firstDayOfWeek={firstDayOfWeek}
							onPrevious={goToPreviousMonths}
							onNext={goToNextMonths}
						/>
					))}
				</div>
			</div>
		</DatepickerContext.Provider>
	);
}
Datepicker.propTypes = {
	minDateTime: PropTypes.number,
	className: PropTypes.string,
	selectedDate: PropTypes.instanceOf(Date),
	handler: PropTypes.func,
};
