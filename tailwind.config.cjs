/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,jsx}'],
	theme: {
		extend: {
			animation: {
				'spin-slow': 'spin 6s linear infinite',
			},
			height: {
				13: '3.125rem',
			},
			maxHeight: {
				87: '21.75rem',
				128: '32rem',
				150: '37.5rem',
			},
			gridTemplateColumns: {
				calendarMonth: 'repeat(1, 300px)',
			},
		},
	},
	plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
	variants: {
		scrollbar: ['rounded'],
	},
};
