import { createContext } from 'react';

export const defaultValue = {
	focusedDate: null,
	isDateFocused: () => false,
	isDateSelected: () => false,
	isDateHovered: () => false,
	isDateBlocked: () => false,
	isFirstOrLastSelectedDate: () => false,
	onDateFocus: () => {},
	onDateHover: () => {},
	onDateSelect: () => {},
};

export const DatepickerContext = createContext(defaultValue);
