export function parseFormData(formData, keys = []) {
	return keys.reduce((previous, current) => {
		return {
			...previous,
			[current]: formData.get(current),
		};
	}, {});
}
