module.exports = {
	rules: [
		{
			test: /\.(js|ts|tsx)$/,
			exclude: /node_modules/,
			use: ['babel-loader', 'eslint-loader'],
		},
	],
};
