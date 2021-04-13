module.exports = {
	env: {
		browser: true,
	},
	root: false,
	rules: {
		test: /\.(tsx|ts)$/,
		exclude: /node_modules/,
		use: ['babel-loader', 'eslint-loader'],
		'no-console': 'off',
		'no-debugger': 'off',
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
	parserOptions: {
		project: './tsconfig.json',
	},
};
