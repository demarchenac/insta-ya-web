import { useRef, useContext } from 'react';
import { useDay } from '@datepicker-react/hooks';
import PropTypes from 'prop-types';
import { DatepickerContext } from './context';

export function Day({ day, date }) {
	const dayRef = useRef(null);
	const {
		focusedDate,
		isDateFocused,
		isDateSelected,
		isDateHovered,
		isDateBlocked,
		isFirstOrLastSelectedDate,
		onDateSelect,
		onDateFocus,
		onDateHover,
	} = useContext(DatepickerContext);

	const {
		isSelectedStartOrEnd,
		onClick,
		onKeyDown,
		onMouseEnter,
		tabIndex,
		disabledDate: isDisabled,
	} = useDay({
		date,
		focusedDate,
		isDateFocused,
		isDateSelected,
		isDateHovered,
		isDateBlocked,
		isFirstOrLastSelectedDate,
		onDateFocus,
		onDateSelect,
		onDateHover,
		dayRef,
	});

	if (!day) {
		return <div />;
	}

	let dayClasses = isSelectedStartOrEnd
		? 'hover:bg-indigo-600 bg-indigo-600 text-white'
		: 'hover:bg-gray-300';

	dayClasses = isDisabled ? 'text-gray-400 cursor-not-allowed' : dayClasses;

	return (
		<button
			onClick={onClick}
			onKeyDown={onKeyDown}
			onMouseEnter={onMouseEnter}
			tabIndex={tabIndex}
			type="button"
			ref={dayRef}
			className={`mx-1 py-2 rounded-md   ${dayClasses}`}
		>
			{day}
		</button>
	);
}

Day.propTypes = {
	day: PropTypes.string,
	date: PropTypes.instanceOf(Date),
};
