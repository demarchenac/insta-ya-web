import { useMonth } from '@datepicker-react/hooks';
import PropTypes from 'prop-types';
import { Day } from './Day';

const navigationClasses =
	'px-4 py-2 text-gray-900 rounded-md hover:bg-gray-200';

const disabledNavigationClasses = 'px-4 py-2 text-gray-400 cursor-not-allowed';

const weekdays = {
	mo: 'Lun',
	tu: 'Mar',
	we: 'Míe',
	th: 'Jue',
	fr: 'Vie',
	sa: 'Sab',
	su: 'Dom',
};

const months = {
	january: 'Enero',
	february: 'Febrero',
	march: 'Marzo',
	april: 'Abril',
	may: 'Mayo',
	june: 'Junio',
	july: 'Julio',
	august: 'Agosto',
	september: 'Septiembre',
	october: 'Octubre',
	november: 'Noviembre',
	december: 'Diciembre',
};

const translateWeekDay = (weekDay) => {
	const lowerWeekDay = weekDay.toLowerCase();
	return weekdays[lowerWeekDay];
};

const translateMonth = (monthLabel) => {
	const spaceIndex = monthLabel.indexOf(' ');
	const lowerMonth = monthLabel.substr(0, spaceIndex).toLowerCase();
	const translatedMonth = months[lowerMonth];
	return translatedMonth + monthLabel.substr(spaceIndex);
};

export function Month({
	year,
	month,
	firstDayOfWeek,
	minDateTime,
	onNext = () => {},
	onPrevious = () => {},
}) {
	const { days, weekdayLabels, monthLabel } = useMonth({
		year,
		month,
		firstDayOfWeek,
	});

	const monthTime = new Date(year, month, 1, 0, 0, 0, 0).getTime();

	const disableBackNavigation = monthTime < minDateTime;

	const backNavigationDynamicClasses = disableBackNavigation
		? disabledNavigationClasses
		: navigationClasses;

	return (
		<div>
			<div className="mb-4 flex justify-between">
				<button
					id="datepicker-nav-previous"
					type="button"
					onClick={onPrevious}
					className={`rotate-180 ${backNavigationDynamicClasses}`}
					disabled={disableBackNavigation}
				>
					&#10140;
				</button>
				<span className="flex justify-center items-center">
					<strong>{translateMonth(monthLabel)}</strong>
				</span>
				<button
					id="datepicker-nav-next"
					type="button"
					onClick={onNext}
					className={navigationClasses}
				>
					&#10140;
				</button>
			</div>
			<div className="grid grid-cols-7 justify-center">
				{weekdayLabels.map((dayLabel) => (
					<div className="text-center" key={dayLabel}>
						{translateWeekDay(dayLabel)}
					</div>
				))}
			</div>
			<div className="grid grid-cols-7 justify-center">
				{days.map((day, index) => (
					<Day
						date={day.date}
						key={`${year}-${month}-${day.dayLabel}-[${index}]`}
						day={day.dayLabel}
					/>
				))}
			</div>
		</div>
	);
}

Month.propTypes = {
	year: PropTypes.number,
	month: PropTypes.number,
	firstDayOfWeek: PropTypes.number,
	minDateTime: PropTypes.number,
	onNext: PropTypes.func,
	onPrevious: PropTypes.func,
};
