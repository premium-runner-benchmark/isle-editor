// MODULES //

import * as actions from './../actions';
import electronStore from './../../store/electron.js';


// EXPORTS //

export default {
	label: 'File',
	submenu: [ {
		label: 'New File',
		accelerator: 'CmdOrCtrl+N',
		click: ( menuItem, browserWindow ) => {
			actions.newFile({ browserWindow });
		}
	},
	{
		label: 'New From Template',
		submenu: []
	},
	{
		label: 'Open File',
		accelerator: 'CmdOrCtrl+O',
		click: ( menuItem, browserWindow ) => {
			actions.open({ browserWindow });
		}
	},
	{
		type: 'separator'
	},
	{
		label: 'Save File',
		accelerator: 'CmdOrCtrl+S',
		click: ( menuItem, browserWindow ) => {
			actions.save({ browserWindow });
		}
	},
	{
		label: 'Save File As',
		accelerator: 'Shift+CmdOrCtrl+S',
		click: ( menuItem, browserWindow ) => {
			actions.saveAs({ browserWindow });
		}
	},
	{
		type: 'separator'
	},
	{
		label: 'Create Template...',
		submenu: [
			{
				label: 'From this File with Preamble',
				click: ( menuItem, browserWindow ) => {
					actions.createTemplate({ browserWindow, includePreamble: true });
				}
			},
			{
				label: 'From this File without Preamble',
				click: ( menuItem, browserWindow ) => {
					actions.createTemplate({ browserWindow, includePreamble: false });
				}
			},
			{
				label: 'Import Templates from Gist',
				click: ( menuItem, browserWindow ) => {
					const hasToken = electronStore.has( 'githubAccessToken' );
					if ( !hasToken ) {
						return actions.showDialog({
							browserWindow,
							message: 'Please link to your GitHub account in order to use this feature,'
						});
					}
					actions.importTemplatesFromGist({ browserWindow });
				}
			}
		]
	},
	{
		label: 'Open Recent',
		submenu: []
	},
	{
		type: 'separator'
	},
	{
		label: 'Quit',
		accelerator: 'CmdOrCtrl+Q',
		click: ( menuItem, browserWindow ) => {
			actions.startClosingApp({ browserWindow });
		}
	} ]
};
