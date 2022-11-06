import { useEffect, useRef, useState } from 'react';

export function useDynamicSvgImport(iconName) {
	const importedIconRef = useRef();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		setLoading(true);
		// dynamically import the mentioned svg icon name in props
		const importSvgIcon = async () => {
			// please make sure all your svg icons are placed in the same directory
			// if we want that part to be configurable then instead of iconName we will send iconPath as prop
			try {
				importedIconRef.current = (
					await import(`@/assets/icons/${iconName}.svg`)
				).ReactComponent; // svgr provides ReactComponent for given svg path
			} catch (err) {
				setError(err);
				// eslint-disable-next-line no-console
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		importSvgIcon();
	}, [iconName]);

	return { error, loading, SvgIcon: importedIconRef.current };
}
