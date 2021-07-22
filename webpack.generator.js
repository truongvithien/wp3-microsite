'use strict';

// core 
const webpack = require('webpack');
// lib
const path = require('path');
// plugin
const SpritesmithPlugin = require('webpack-spritesmith');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const LiveReloadPlugin = require('webpack-livereload-plugin');

//---- GENERATOR

const pluginGenerator = (options, dir, fileNames = [], spriteGroups = []) => {
	const commonPlugin = [
		new LiveReloadPlugin(),
		new webpack.ProvidePlugin({
			'$': 'jquery'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		}),
	];

	let customPlugin = [
		...commonPlugin,
		new MiniCssExtractPlugin({
			filename: `${dir}.css`,
			ignoreOrder: false
		}),
		new CleanWebpackPlugin({
			cleanStaleWebpackAssets: false,
		}),
		new CopyWebpackPlugin([
			{ 
				from: `src/${dir}/assets`, 
				to: `assets`, 
				logLevel: 'debug',
				force: true,
			} 
		])
	];

	fileNames.forEach(fileName => {
		customPlugin.push(
			new HtmlWebpackPlugin({
				filename: `${fileName}.html`,
				template: `src/${dir}/html/${fileName}.html.twig`
			})
		)
	})

	spriteGroups.forEach(group => {
		customPlugin.push(makeSprite(dir, group))
	})

	return customPlugin;
}

// LOADER

const makeSprite = (pathRoot, pathSprite) => new SpritesmithPlugin({
	src: {
		cwd: path.resolve(__dirname, 'src/' + pathRoot + '/sprites', pathSprite),
		glob: '*.{jpg,png}'
	},
	target: {
		image: path.resolve(__dirname, 'src/' + pathRoot + '/assets', '_sprites-' + pathSprite + '.png'),
		css: path.resolve(__dirname, 'src/' + pathRoot + '/scss/sprites', '_sprites-' + pathSprite + '.scss')
	},
	apiOptions: {
		cssImageRef: '../assets/_sprites-' + pathSprite + '.png'
	}
});

const styleLoader = (pathRoot) => {
	return {
		test: /\.(sa|sc|c)ss$/,
		use: [
			{
				loader: MiniCssExtractPlugin.loader,
				options: {
					publicPath: `../${pathRoot}`,
				},
			},
			{
				loader: 'css-loader',
				options: {
					sourceMap: true
				}
			},
			'sass-loader'
		]
	}
};

const fileLoader = (pathRoot) => {
	return {
		test: /\.(svg|png|jpe?g|gif|mp4|otf|eot|ttf|woff|woff2)$/,
		use: [
			{
				loader: 'url-loader',
				options: {
					limit: false,
					name: '[path][name].[ext]',
					publicPath: (_, resourcePath, __) => {
					  console.log(_, resourcePath, __);
					  return 'assets/' + resourcePath.replace(/[\\]/g, "/").replace(/^(.*?)(assets\/)/g, "");
					},
					outputPath: (_, resourcePath, __) => {
					  console.log(_, resourcePath, __);
					  return 'assets/' + resourcePath.replace(/[\\]/g, "/").replace(/^(.*?)(assets)/g, "");
					}
				}
			}
		]
	}
}


const imageCompressLoader = (pathRoot) => {
	return {
		test: /\.(jpg|png)$/,
		use: {
			loader: 'image-webpack-loader',
			options: {
				mozjpeg: {
					progressive: true,
					quality: 80
				},
				optipng: {
					enabled: true,
				},
				pngquant: {
					quality: [0.8, 0.9],
					speed: 7
				},
			}
		},
		enforce: 'pre'
	}
}

const svgInlineLoader = (pathRoot) => {
	return {
		test: /\.svg$/,
		exclude: [
			path.resolve(__dirname, 'src/' + pathRoot + '/svg')
		],
		loader: 'svg-inline-loader'
	}
}

const scriptLoader = (pathRoot) => {
	return {
		test: /\.js$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader'
		}
	}
}

const twigLoader = _ => {
	return {
		test: /\.twig$/,
		use: [{
			loader: 'twig-loader',
			options: {}
		}]
	}
}

const jQueryLoader = _ => {
	return {
		test: require.resolve('jquery'),
		use: [{
			loader: 'expose-loader',
			options: {
				exposes: 'jQuery'
			}
		}, {
			loader: 'expose-loader',
			options: {
				exposes: '$'
			}
		}]
	};
};

module.exports = {
	configGenerator: (options, dir, fileNames = [], spriteGroups = []) => {
		console.log(options, dir, fileNames, spriteGroups);
		return {
			name: dir,
			entry: [`./src/${dir}.js`],
			devtool: options.mode === "production" ? '' : 'source-map',
			output: {
				filename: `${dir}.bundle.js`,
				path: path.resolve(__dirname, `${dir}`),
				publicPath: ``
			},
			module: {
				rules: [
					fileLoader(dir),
					twigLoader(dir),
					scriptLoader(dir),
					styleLoader(dir),
					jQueryLoader(dir)
				]
			},
			optimization: {
				splitChunks: {
					cacheGroups: {
						commons: {
							test: /[\\/]node_modules[\\/]/,
							name: 'vendors',
							chunks: 'all'
						}
					}
				}
			},
			plugins: pluginGenerator(options, dir, fileNames, spriteGroups),
			node: {
				fs: "empty"
			}
		}
	}
};