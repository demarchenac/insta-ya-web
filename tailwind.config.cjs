/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,jsx}'],
	theme: {
		extend: {
			height: {
				13: '3.125rem',
			},
		},
	},
	plugins: [],
};
