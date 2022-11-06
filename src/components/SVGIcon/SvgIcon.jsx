import PropTypes from 'prop-types';
import { useDynamicSvgImport } from '@/hooks/useDynamicSvgImport';

export function SvgIcon({ name, wrapperClasses, className, svgProps }) {
	const { loading, SvgIcon } = useDynamicSvgImport(name);

	return (
		<>
			{loading && (
				<div className="rounded-full bg-gray-100 animate-pulse h-2 w-2"></div>
			)}
			{SvgIcon && (
				<div className={wrapperClasses}>
					<SvgIcon {...svgProps} className={className} />
				</div>
			)}
		</>
	);
}

const svgPropTypes = PropTypes.shape({
	width: PropTypes.number,
	height: PropTypes.number,
	fill: PropTypes.string,
	stroke: PropTypes.number,
	className: PropTypes.string,
});

SvgIcon.propTypes = {
	name: PropTypes.string,
	wrapperClasses: PropTypes.string,
	className: PropTypes.string,
	svgProps: svgPropTypes,
};
