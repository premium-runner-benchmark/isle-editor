// MODULES //

import * as types from 'constants/editor_actions.js';


// MAIN //

function updateMarkdown( markdown = '' ) {
	return {
		type: types.MARKDOWN_CHANGED,
		payload: {
			markdown
		}
	};
}


// EXPORTS //

export function convertMarkdown( markdown ) {
	return updateMarkdown( markdown );
}

export function fileLoaded({ fileName, filePath, file }) {
	return {
		type: types.FILE_LOADED,
		payload: {
			fileName,
			filePath,
			file
		}
	};
}

export function createdFromTemplate({ template, preamble, preambleText }) {
	return {
		type: types.CREATED_FROM_TEMPLATE,
		payload: {
			template,
			preamble,
			preambleText
		}
	};
}

export function saveSpellingErrors( errors ) {
	return {
		type: types.SPELLING_ERRORS,
		payload: {
			errors
		}
	};
}

export function saveLintErrors( errors ) {
	return {
		type: types.LINT_ERRORS,
		payload: {
			errors
		}
	};
}

export function encounteredError( error ) {
	return {
		type: types.ENCOUNTERED_ERROR,
		payload: {
			error
		}
	};
}

export function resetError() {
	return {
		type: types.RESET_ERROR
	};
}

export function jumpToElementInEditor({ startLineNumber, endLineNumber, elementRangeAction }) {
	return {
		type: types.JUMP_TO_ELEMENT_IN_EDITOR,
		payload: {
			startLineNumber,
			endLineNumber,
			elementRangeAction
		}
	};
}

export function toggleConfigurator( opened ) {
	return {
		type: types.TOGGLE_CONFIGURATOR,
		payload: {
			opened
		}
	};
}

export function toggleLineButtons( show ) {
	return {
		type: types.TOGGLE_LINE_BUTTONS,
		payload: {
			show
		}
	};
}

export function setConfiguratorComponent({ component }) {
	return {
		type: types.SET_CONFIGURATOR_COMPONENT,
		payload: {
			component
		}
	};
}

export function pasteInsertion({ text }) {
	return {
		type: types.PASTE_INSERTION,
		payload: {
			text
		}
	};
}

export function clearInsertion() {
	return {
		type: types.CLEAR_INSERTION,
		payload: {}
	};
}

export function toggleScrolling() {
	return {
		type: types.TOGGLE_SCROLLING
	};
}

export function toggleToolbar() {
	return {
		type: types.TOGGLE_TOOLBAR
	};
}

export function updatePreamble({ preamble, preambleText }) {
	return {
		type: types.PREAMBLE_CHANGED,
		payload: {
			preamble,
			preambleText
		}
	};
}

export function changeView( role ) {
	return {
		type: types.ROLE_CHANGED,
		payload: {
			role
		}
	};
}

export function changeMode( mode ) {
	return {
		type: types.MODE_CHANGED,
		payload: {
			mode
		}
	};
}

export function changeNamespace( namespaceName ) {
	return {
		type: types.SERVER_NAMESPACE_CHANGED,
		payload: {
			namespaceName
		}
	};
}

export function changeRenderInterval( renderInterval ) {
	return {
		type: types.RENDER_INTERVAL_CHANGED,
		payload: {
			renderInterval
		}
	};
}

export function changeAutoUpdate( autoUpdatePreview ) {
	return {
		type: types.AUTO_UPDATE_CHANGED,
		payload: {
			autoUpdatePreview
		}
	};
}

export function changeFontSize( fontSize ) {
	return {
		type: types.FONT_SIZE_CHANGED,
		payload: {
			fontSize
		}
	};
}

export function changePreambleTemplate( preambleTemplate ) {
	return {
		type: types.PREAMBLE_TEMPLATE_CHANGED,
		payload: {
			preambleTemplate
		}
	};
}
