// MODULES //

import * as actions from 'actions';
import { ipcRenderer } from 'electron';
import Store from 'electron-store';
import vex from 'vex-js';
import vexDialog from 'vex-dialog';
import isArray from '@stdlib/assert/is-array';
import contains from '@stdlib/assert/contains';
import replace from '@stdlib/string/replace';
import trim from '@stdlib/string/trim';
import logger from 'debug';
import VIDEO_LECTURE_TEMPLATE from 'constants/templates/video_lecture.js';
import LECTURE_SLIDES_TEMPLATE from 'constants/templates/lecture_slides.js';
import DATA_EXPLORER_TEMPLATE from 'constants/templates/data_explorer.js';
import PREAMBLE from 'constants/preamble.js';
import mergePrambles from 'utils/merge-preambles';
import 'vex-js/dist/css/vex.css';
import 'vex-js/dist/css/vex-theme-plain.css';


// VARIABLES //

const debug = logger( 'isle-editor' );
vex.registerPlugin( vexDialog );
vex.defaultOptions.className = 'vex-theme-plain';
const config = new Store( 'ISLE' );
const RE_PREAMBLE = /^---([\S\s]*?)---/;


// MAIN //

function configureIpcRenderer( store ) {
	ipcRenderer.on( 'file-loaded', ( e, { file, fileName, filePath }) => {
		debug( 'Loaded file: '+ filePath );
		store.dispatch( actions.fileLoaded({ fileName, filePath, file }) );

		let preambleText = file.match( RE_PREAMBLE );
		if ( preambleText ) {
			// Extract the capture group:
			preambleText = preambleText[ 1 ];
			preambleText = replace( preambleText, '\t', '    ' ); // Replace tabs with spaces as YAML may not contain the former...
			import( 'js-yaml' ).then( yaml => {
				const preamble = yaml.load( preambleText );
				store.dispatch( actions.updatePreamble({
					preamble,
					preambleText
				}) );
				config.set( 'mostRecentPreamble', preamble );
				config.set( 'mostRecentPreambleText', preambleText );
			});
		}
		config.set( 'mostRecentFilePath', filePath );

		let fileList = config.get( 'recentFiles' );
		if ( !isArray( fileList ) ) {
			fileList = [];
		}
		if ( !contains( fileList, filePath ) ) {
			fileList.unshift( filePath );
		}
		config.set( 'recentFiles', fileList );
	});

	ipcRenderer.on( 'created-from-template', ( e, { name }) => {
		let template;
		let preambleAdditions;
		switch ( name ) {
			case 'video-lecture':
				template = VIDEO_LECTURE_TEMPLATE;
			break;
			case 'lecture-slides':
				template = LECTURE_SLIDES_TEMPLATE;
				preambleAdditions = {
					fixedView: true
				};
			break;
			case 'data-explorer':
				template = DATA_EXPLORER_TEMPLATE;
				preambleAdditions = {
					require: {
						dataFile: '',
						dataInfoFile: ''
					}
				};
			break;
			default:
				template = config.get( 'templates.'+name );
				preambleAdditions = {};
			break;
		}
		const preambleTemplate = config.get( 'preambleTemplate' ) || PREAMBLE;
		import( 'js-yaml' ).then( yaml => {
			let preamble = yaml.load( preambleTemplate );
			preamble = mergePrambles( preamble, preambleAdditions );
			const preambleText = trim( yaml.safeDump( preamble ) );
			store.dispatch( actions.createdFromTemplate({ template, preamble, preambleText }) );
		});
	});

	ipcRenderer.on( 'create-template-prompt', ( e, { includePreamble }) => {
		vex.dialog.prompt({
			message: `Create a lesson template from the current file ${includePreamble ? 'with the preamble' : 'without the preamble'}:`,
			placeholder: 'Enter template name',
			callback( value ) {
				if ( value ) {
					const state = store.getState().markdown;
					let text = state.markdown;
					if ( !includePreamble ) {
						text = replace( text, RE_PREAMBLE, '---\n<preamble>\n---' );
					}
					config.set( `templates.${value}`, text );
					vex.dialog.alert( 'Template successfully created!' );
					ipcRenderer.send( 'redraw-templates-menu' );
				}
			}
		});
	});

	ipcRenderer.on( 'open-template-dialog', ( e, { name } ) => {
		vex.dialog.open({
			message: 'Please confirm that you want to create a new file with the chosen template',
			buttons: [
				{
					type: 'text',
					text: 'Confirm',
					className: 'vex-dialog-button-primary',
					click() {
						ipcRenderer.send( 'create-from-user-template', {
							name
						});
					}
				},
				{
					type: 'text',
					text: 'Cancel',
					className: 'vex-dialog-button-secondary'
				},
				{
					type: 'text',
					text: 'Delete',
					className: 'vex-dialog-button-danger',
					click() {
						vex.dialog.confirm({
							unsafeMessage: '<p>Are you sure you want to delete the <b>'+name+'</b> template?</p>',
							buttons: [
								{ ...vex.dialog.buttons.YES, className: 'vex-dialog-button-danger' },
								vex.dialog.buttons.NO
							],
							callback( value ) {
								if ( value ) {
									vex.dialog.alert( 'Template successfully deleted.' );
									config.delete( 'templates.'+name );
									ipcRenderer.send( 'redraw-templates-menu' );
								}
							}
						});
					}
				}
			]
		});
	});

	ipcRenderer.on( 'show-dialog', ( e, { message }) => {
		vex.dialog.alert({ unsafeMessage: message });
	});

	ipcRenderer.on( 'hide-toolbar', () => {
		store.dispatch( actions.toggleToolbar() );
	});

	ipcRenderer.on( 'prepare-reload', () => {
		debug( 'Prepare reload...' );
		const state = store.getState().markdown;
		const { markdown, filePath, preamble, preambleText } = state;
		config.set( 'mostRecentFilePath', filePath );
		config.set( 'mostRecentFileData', markdown );
		config.set( 'mostRecentPreamble', preamble );
		config.set( 'mostRecentPreambleText', preambleText );
	});

	ipcRenderer.on( 'save-file', () => {
		const state = store.getState();
		const data = state.markdown.markdown;
		const filePath = state.markdown.filePath;
		if ( !filePath ) {
			ipcRenderer.send( 'save-file-as', {
				data
			});
			return;
		}
		ipcRenderer.send( 'save-file', {
			data,
			filePath
		});
	});

	ipcRenderer.on( 'save-file-as', () => {
		const state = store.getState();
		const data = state.markdown.markdown;
		const filePath = state.markdown.filePath;
		ipcRenderer.send( 'save-file-as', {
			data,
			filePath
		});
	});

	ipcRenderer.on( 'clear-cache', () => {
		config.set( 'mostRecentFilePath', null );
		config.set( 'mostRecentFileData', null );
		config.set( 'mostRecentPreamble', {} );
		config.set( 'mostRecentPreambleText', '' );
		config.set( 'recentFiles', [] );
	});

	ipcRenderer.on( 'confirm-close-when-unsaved', ( e, { windowID }) => {
		const state = store.getState();
		const unsaved = state.markdown.unsaved;
		if ( unsaved ) {
			vex.dialog.open({
				message: 'Do you want to save the changes made to the current file?',
				buttons: [
					{
						type: 'text',
						text: 'Save',
						className: 'vex-dialog-button-primary',
						click() {
							const filePath = state.markdown.filePath;
							const data = state.markdown.markdown;
							if ( !filePath ) {
								ipcRenderer.send( 'save-file-as', {
									data
								});
								return;
							}
							ipcRenderer.send( 'save-file', {
								data,
								filePath
							});
						}
					},
					{
						type: 'text',
						text: 'Cancel',
						className: 'vex-dialog-button-secondary'
					},
					{
						type: 'text',
						text: 'Don\' save',
						className: 'vex-dialog-button-secondary',
						click() {
							ipcRenderer.send( 'close-window', { windowID });
						}
					}
				]
			});
		} else {
			ipcRenderer.send( 'close-window', { windowID });
		}
	});

	ipcRenderer.on( 'close-editor', () => {
		console.log( 'Closing the editor...' ); // eslint-disable-line no-console
		config.set( 'mostRecentFileData', null );
	});

	window.document.addEventListener( 'dragover', ( e ) => {
		e.preventDefault();
	});

	ipcRenderer.on( 'message', ( event, text ) => {
		console.log( text ); // eslint-disable-line no-console
	});
}


// EXPORTS //

export default configureIpcRenderer;
