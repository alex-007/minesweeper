const {resolve} = require('path')
const webpack = require('webpack')

const config = {
	entry: [
		'webpack-hot-middleware/client',
		'babel-polyfill',
		'./src/index.tsx'
	],
	target: 'web',

	output: {
		path: resolve(__dirname, 'public/js'),
		filename: 'bundle.js',
		publicPath: '/js/',
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: 'cheap-module-eval-source-map',

	resolve: {
		extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
	},

	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'react-hmre',
								'es2015',
								'stage-0'
							],
							plugins: [
								'react-hot-loader/babel',
								'transform-runtime'
							]
						},
					},
					{
						loader: 'ts-loader'
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							useable: true
						}
					},
					{
						loader: 'css-loader',
						options: {
							module: true,
							sourceMap: true
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	]
}

module.exports = config
