'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		[`ui-router-app`]: `./app/ui-router/app.module.js`,
		[`react-router-app`]: `./app/react-router/app.module.js`,
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './build'),
	},
	plugins: [
	],
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react']
				}
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader',
			},
			{
				test: /\.(eot|svg|gif|png|jpg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
				loader: 'url-loader'
			},
		],
	},
}
