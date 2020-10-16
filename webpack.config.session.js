// MODULES //

const { DllPlugin } = require( 'webpack' );
const { join, resolve } = require( 'path' );
const TerserPlugin = require( 'terser-webpack-plugin' );


// MAIN //

const config = {
	module: {
		rules: [
			{
				test: /\.js?$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							plugins: [
								'@babel/plugin-proposal-export-default-from',
								'@babel/plugin-proposal-class-properties'
							],
							presets: [
								'@babel/preset-env'
							],
							cacheDirectory: true,
							cacheCompression: false
						}
					}
				],
				include: [
					join( __dirname, 'app' )
				]
			}
		]
	},
	resolve: {
		modules: [
			resolve( './app' ),
			resolve( './node_modules' )
		]
	},
	entry: {
		session: [
			'./app/session'
		]
	},
	output: {
		path: join( __dirname, 'dll', 'session' ),
		filename: 'dll.[name].js',
		library: '[name]_dll',
		publicPath: 'https://cdn.jsdelivr.net/npm/@isle-project/session@0.32.1/'
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: 'all',
				parallel: true
			})
		]
	},
	plugins: [
		new DllPlugin({
			path: join( __dirname, 'app', 'session', '[name]-manifest.json' ),
			name: '[name]_dll'
		})
	],
	externals: {
		'axios': 'axios',
		'localforage': 'localforage',
		'react': 'React',
		'react-dom': 'ReactDOM',
		'pdfjs-dist/build/pdf.min.js': 'pdfjsLib',
		'react-table': 'ReactTable',
		'prop-types': 'PropTypes',
		'react-contextmenu': 'ReactContextMenu',
		'react-draggable': 'ReactDraggable',
		'react-list': 'ReactList',
		'react-notification-system': 'ReactNotificationSystem',
		'react-player': 'ReactPlayer',
		'pdfmake/build/pdfmake': 'pdfMake',
		'pdfmake/build/vfs_fonts.js': 'pdfMake',
		'plotly.js': 'Plotly',
		'katex': 'katex',
		'moment': 'moment',
		'victory': 'Victory',
		'd3': 'd3',
		'socket.io-client': 'io',
		'js-yaml': 'jsyaml',
		'markdown-it': 'markdownit',
		'lodash': '_'
	}
};


// EXPORTS //

module.exports = config;
