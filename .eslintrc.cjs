module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'prettier',
		'plugin:prettier/recommended',
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', 'prettier'],
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		// indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-console': 'error',
		'no-duplicate-imports': ['error', { includeExports: true }],
		'no-self-compare': 'error',
		'no-template-curly-in-string': 'warn',
		'no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
			},
		],
		'no-use-before-define': 'error',
		// Suggestions
		curly: 'error',
		'default-case': 'error',
		eqeqeq: 'error',
		// Plugins
		// 'prettier/prettier': ['error', { tabWidth: 2, useTabs: true }],
		'prettier/prettier': 'error',
		// react related
		// since react is v18 then we can disable the following:
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
	},
};
