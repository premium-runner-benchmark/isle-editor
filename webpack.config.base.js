// MODULES //

import { join, resolve } from 'path';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';


// VARIABLES //

/*
* External modules that need not to be bundled with the main electron application. Due to copying a significant chunk of the `node_modules` when bundling as `externalResources` so that users can use these packages, placing a package in this list avoids code duplication.
*/
const EXTERNALS = [
	'@stdlib/stdlib',
	'ajv',
	'archiver',
	'camelcase',
	'child_process',
	'compute-chunkify',
	'csv-parse',
	'csv-stringify',
	'd3',
	'd3-cloud',
	'detect-csv',
	'eslint', // needs to be external for CLI Engine to work for linting
	'form-data',
	'fsevents',
	'html-webpack-plugin', // must be external due to errors otherwise
	'markdown-it',
	'@iktakahiro/markdown-it-katex',
	'minimist',
	'mini-css-extract-plugin',
	'ml-pca',
	'murmurhash3js',
	'node-pty',
	'node-libs-browser',
	'pdfjs-dist/build/pdf.js',
	'profanities',
	'pressure',
	'react-bootstrap',
	'react-color',
	'react-copy-to-clipboard',
	'react-dates',
	'react-floater',
	'react-grid-layout',
	'react-highlight-words',
	'react-input-range',
	'react-joyride',
	'react-json-tree',
	'react-plotly.js',
	'react-select',
	'react-slick',
	'react-table',
	'react-virtualized',
	'recordrtc',
	'stemmer',
	'svgo',
	'tapable',
	'terser-webpack-plugin', // must be external due to errors otherwise
	'typo-js',
	'uniq',
	'venn.js',
	'webpack',
	'workbox-webpack-plugin'
];


// MAIN //

export default {
	module: {
		rules: [ {
			test: /\.js?$/,
			use: [
				{
					loader: 'babel-loader',
					options: {
						plugins: [],
						cacheDirectory: true,
						cacheCompression: false
					}
				}
			],
			include: [
				join( __dirname, 'main.development.js' ),
				join( __dirname, 'app' )
			],
			exclude: /fonts\.js$/
		},
		{
			test: /\.txt$/,
			use: 'raw-loader'
		},
		{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			]
		},
		{
			test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
			use: {
				loader: 'file-loader',
				options: {
					name: 'static/media/[name].[hash:8].[ext]'
				}
			}
		}],
		noParse: [
			/node_modules\/json-schema\/lib\/validate\.js/
		]
	},
	output: {
		path: join( __dirname, 'dist' ),
		filename: 'bundle.js',
		libraryTarget: 'commonjs2',
		globalObject: '(typeof self !== "undefined" ? self : this)'
	},
	resolve: {
		alias: {
			'victory': resolve( './node_modules/victory/dist/victory.min.js' ),
			'form-data': resolve( './node_modules/form-data/lib/form_data.js' )
		},
		modules: [
			resolve( './app' ),
			resolve( './node_modules' )
		],
		extensions: [ '.js', '.json' ],
		mainFields: [ 'webpack', 'browser', 'web', 'browserify', [ 'jam', 'main' ], 'main' ]
	},
	plugins: [
		new MonacoWebpackPlugin({
			features: [
				'accessibilityHelp',
				'bracketMatching',
				'caretOperations',
				'clipboard',
				'codeAction',
				'codelens',
				'colorDetector',
				'coreCommands',
				'cursorUndo',
				'dnd',
				'find',
				'folding',
				'fontZoom',
				'gotoError',
				'gotoLine',
				'hover',
				'inPlaceReplace',
				'indentation',
				'inspectTokens',
				'linesOperations',
				'links',
				'multicursor',
				'parameterHints',
				'quickCommand',
				'referenceSearch',
				'rename',
				'smartSelect',
				'snippets',
				'suggest',
				'toggleHighContrast',
				'toggleTabFocusMode',
				'transpose',
				'wordHighlighter',
				'wordOperations',
				'wordPartOperations'
			],
			languages: [ 'javascript', 'typescript' ]
		})
	],
	externals: EXTERNALS
};
