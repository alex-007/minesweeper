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
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.tsx?$/,
				loaders: [
					'babel-loader?presets[]=react-hmre&presets[]=es2015&presets[]=stage-0&plugins[]=react-hot-loader/babel',
					'ts-loader'
				]
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader?modules',
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	]
}

module.exports = config
