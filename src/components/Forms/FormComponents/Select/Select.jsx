import { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { SvgIcon } from '@/components/SVGIcon';
import { useOutsideClickWatcher } from '@/hooks/useOutsideClickWatcher';

const normalClasses =
	'border border-gray-300 focus:border-indigo-500 focus:ring-indigo-300';
const errorClasses = 'border border-red-500 focus:ring-red-300';

const iconNormalClasses = 'fill-gray-900';
const iconErrorClasses = 'fill-red-500';

export function Select({
	name,
	initialValue = null,
	persistOptions = false,
	options = [],
	required = false,
	hasError = false,
	handler = () => {},
	onOutsideClick = () => {},
}) {
	const [initialOption] =
		initialValue &&
		options &&
		options.filter((opt) => opt.value === initialValue);

	const [showOptions, toggleOptions] = useState(false);
	const [isInSelect, toggleInSelect] = useState(false);
	const [selected, setSelected] = useState(initialOption ?? {});

	const ref = useRef();
	const listRef = useRef();

	const outsideClickHandler = () => {
		toggleInSelect(false);
		toggleOptions(false);
		onOutsideClick();
	};

	useOutsideClickWatcher(
		isInSelect,
		ref,
		outsideClickHandler,
		persistOptions ? listRef : null,
	);

	const hasEmptyValue =
		selected && (!selected.value || (selected.value && selected.value === ''));

	let inputValue = {};
	if (!hasEmptyValue) {
		inputValue.value = selected.value;
	}

	const emptyValueClasses = hasEmptyValue ? 'text-gray-400' : '';

	const iconClasses = hasError ? iconErrorClasses : iconNormalClasses;
	const iconRotation = showOptions ? 'rotate-180' : 'rotate-0';

	const dynamicClasses = hasError ? errorClasses : normalClasses;

	const optionsWithValues =
		options.length > 0 &&
		typeof options[0] === 'object' &&
		Object.hasOwn(options[0], 'value');

	const normalizedOptions = useMemo(() => {
		return optionsWithValues
			? options
			: options.map((v) => {
					return { value: v, display: v };
			  });
	}, [optionsWithValues, options]);

	const onButtonClickHanlder = () => {
		toggleOptions((previousOptions) => {
			toggleInSelect(!previousOptions);
			return !previousOptions;
		});
	};

	const selectOptionHandler = (option) => {
		setSelected(option);
		handler(option);
	};

	return (
		<>
			<button
				ref={ref}
				type="button"
				className={`z-10 bg-gray-50 text-gray-900 flex justify-between items-center rounded-lg w-full p-2.5 cursor-pointer focus:outline-none focus:ring-4 ${dynamicClasses} ${emptyValueClasses}`}
				onClick={onButtonClickHanlder}
			>
				{selected?.display ?? 'Seleccione su valor'}
				<SvgIcon
					name="caret"
					className={`transition-transform ease-in ${iconClasses} ${iconRotation}`}
				/>
			</button>
			<div className="relative -z-10">
				<input
					className="absolute -z-10 -top-[46px] border p-2.5 w-full"
					id={name}
					name={name}
					required={required}
					value={selected?.value ?? ''}
					autoComplete="off"
					readOnly
				/>
			</div>
			{showOptions && (
				<div className="relative z-20" ref={listRef}>
					<ul className="absolute bg-gray-50 text-gray-900 border border-gray-300 items-center rounded-lg w-full p-2.5 top-3 shadow-md cursor-pointer max-h-64  overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-transparent scrollbar-thumb-indigo-600 ">
						{normalizedOptions.map((option) => {
							const isSelected = option.value === selected.value;
							const dynamicClasses = isSelected ? 'text-indigo-600' : '';

							return (
								<li
									key={option.value}
									value={option.value}
									onClick={() => selectOptionHandler(option)}
									className={`cursor-pointer rounded-md hover:bg-gray-200 p-2 ${dynamicClasses}`}
								>
									{option.display}
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</>
	);
}

const optionPropTypes = PropTypes.arrayOf(
	PropTypes.shape({
		value: PropTypes.string,
		display: PropTypes.string,
	}),
);

const stringArray = PropTypes.arrayOf(PropTypes.string);

Select.propTypes = {
	name: PropTypes.string.isRequired,
	initialValue: PropTypes.string,
	required: PropTypes.bool,
	hasError: PropTypes.bool,
	persistOptions: PropTypes.bool,
	options: PropTypes.oneOfType([stringArray, optionPropTypes]),
	handler: PropTypes.func,
	onOutsideClick: PropTypes.func,
};
