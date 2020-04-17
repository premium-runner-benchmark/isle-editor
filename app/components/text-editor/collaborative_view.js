// MODULES //

import React, { Component, Fragment } from 'react';
import logger from 'debug';
import PropTypes from 'prop-types';
import { collab, receiveTransaction, sendableSteps, getVersion } from 'prosemirror-collab';
import { Step } from 'prosemirror-transform';
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
import { fixTables } from 'prosemirror-tables';
import plugins from './config/plugins';
import MenuBar from './menubar.js';
import schema from './config/schema';
import { commentPlugin, commentUI } from './config/comments.js';
import FootnoteView from './views/footnote.js';
import { toggleCursorParking } from './config/cursor_parking';
import ImageNodeView from './config/ui/image_node_view.js';
import countWords from './count_words.js';
import handleDrop from './handle_drop.js';
import { COLLABORATIVE_EDITING_EVENTS, JOINED_COLLABORATIVE_EDITING, POLLED_COLLABORATIVE_EDITING_EVENTS,
	SENT_COLLABORATIVE_EDITING_EVENTS, USER_JOINED } from 'constants/events.js';


// VARIABLES //

const debug = logger( 'isle:collaborative-view' );
const RECEIVE_OPTS = {
	mapSelectionBackward: true
};


// FUNCTIONS //

function repeat( val, n ) {
	let result = [];
	for ( let i = 0; i < n; i++ ) {
		result.push( val );
	}
	return result;
}

class State {
	constructor( edit, comm ) {
		this.edit = edit;
		this.comm = comm;
	}
}

function userString( n ) {
	return '(' + n + ' user' + ( n === 1 ? '' : 's') + ')';
}

const StatusBar = ( props ) => {
	return ( <div className="prose-statusbar">
		{ props.nUsers && props.docname ? <span className="docinfo">
			Connected to:
			<span className="connected" style={{ marginLeft: 5 }} >
				<span className="docname">{props.docname}</span>
				<span className="users" style={{ marginLeft: 5 }} >{userString( props.nUsers )}</span>
			</span>
		</span> : null }
		{ props.nWords ? <span>words: {props.nWords}</span> : null }
		{ props.nChars ? <span style={{ marginLeft: 5 }}>characters: {props.nChars}</span> : null }
	</div> );
};


// MAIN //

class ProseMirrorCollaborative extends Component {
	constructor( props ) {
		super( props );

		this.nUsers = null;
	}

	componentDidMount() {
		const session = this.props.session;
		this.docID = `${session.namespaceName}-${session.lessonName}-${this.props.id}`;
		this.unsubscribe = session.subscribe( ( type, action ) => {
			if ( type === USER_JOINED ) {
				if ( !this.dispatchState ) {
					// Load the document from the server and start up:
					this.props.session.joinCollaborativeEditing( this.props.id );
				}
			}
			if ( type === JOINED_COLLABORATIVE_EDITING && action.id === this.docID ) {
				debug( 'Joined collaborative editing...' );
				this.handleStart( action.data );
			}
			else if ( type === POLLED_COLLABORATIVE_EDITING_EVENTS && action.id === this.docID ) {
				if ( this.dispatchState.comm === 'polling' ) {
					this.handlePollResponse( action.data );
				}
			} else if ( type === SENT_COLLABORATIVE_EDITING_EVENTS && action.id === this.docID ) {
				debug( 'Received response after sending collaborative editing events...' );
				if ( this.dispatchState.comm === 'send' ) {
					this.handleSendResponse( action.data );
				}
			}
			else if ( type === COLLABORATIVE_EDITING_EVENTS && action.id === this.docID ) {
				debug( 'Received info that other user updated the document '+JSON.stringify( action.data )+'[comm='+this.dispatchState.comm+']' );
				if ( this.dispatchState.comm === 'listening' ) {
					this.dispatch({ type: 'polling' });
				}
			}
		});

		if ( !this.dispatchState ) {
			// Load the document from the server and start up:
			this.props.session.joinCollaborativeEditing( this.props.id );
		}
	}

	componentDidUpdate( prevProps ) {
		const session = this.props.session;
		if ( this.props.id !== prevProps.id ) {
			this.docID = `${session.namespaceName}-${session.lessonName}-${this.props.id}`;
			session.joinCollaborativeEditing( this.props.id );
		}
	}

	componentWillUnmount() {
		if ( this.view ) {
			this.view.destroy();
		}
		if ( this.unsubscribe ) {
			this.unsubscribe();
		}
	}

	// All state changes go through this:
	dispatch( action ) {
		let newEditState = null;
		if ( action.type === 'loaded' ) {
			const editState = EditorState.create({
				doc: action.doc,
				schema,
				plugins: plugins.concat([
					collab({ version: action.version }),
					commentPlugin,
					commentUI( transaction => this.dispatch({ type: 'transaction', transaction }))
				]),
				comments: action.comments
			});
			this.nUsers = action.users;
			this.dispatchState = new State( editState, 'listening' );
		} else if ( action.type === 'restart' ) {
			this.dispatchState = new State( null, 'start' );
			this.props.session.joinCollaborativeEditing( this.props.id );
		} else if ( action.type === 'listening' ) {
			this.dispatchState = new State( this.dispatchState.edit, 'listening' );
		} else if ( action.type === 'polling' ) {
			this.dispatchState = new State( this.dispatchState.edit, 'polling' );
			this.poll();
		} else if ( action.type === 'recover' ) {
			this.dispatchState = new State( this.dispatchState.edit, 'recover' );
			this.recover();
		} else if ( action.type === 'transaction' ) {
			newEditState = this.dispatchState.edit.apply( action.transaction );
			let fix = fixTables( newEditState );
			if ( fix ) {
				newEditState = newEditState.apply( fix.setMeta( 'addToHistory', false ) );
			}
		}
		if ( newEditState ) {
			/* eslint-disable no-cond-assign */
			let sendable;
			if ( newEditState.doc.content.size > 40000 ) {
				if ( this.dispatchState.comm !== 'detached' ) {
					debug( 'Document too big. Detached.' );
				}
				this.dispatchState = new State( newEditState, 'detached' );
			} else if (
				(this.dispatchState.comm === 'listening' || action.requestDone) &&
				( sendable = this.sendable( newEditState ) )
			) {
				this.dispatchState = new State( newEditState, 'send' );
				this.send( newEditState, sendable );
			} else if ( action.requestDone ) {
				this.dispatchState = new State( newEditState, 'listening' );
			} else {
				this.dispatchState = new State( newEditState, this.dispatchState.comm );
			}
			this.onEditorState( this.dispatchState.edit );
			/* eslint-enable no-cond-assign */
		}

		// Sync the editor with this.dispatchState.edit
		if ( this.dispatchState.edit ) {
			if ( this.view ) {
				this.view.updateState( this.dispatchState.edit );
			} else {
				debug( 'Create editor view...' );
				this.setView( new EditorView( this.editorDiv, {
					state: this.dispatchState.edit,
					nodeViews: {
						footnote: ( node, view, getPos, decorations ) => { return new FootnoteView( node, view, getPos, decorations ); },
						image: ( node, view, getPos, decorations ) => { return new ImageNodeView( node, view, getPos, decorations ); },
						plot: ( node, view, getPos, decorations ) => { return new ImageNodeView( node, view, getPos, decorations ); }
					},
					dispatchTransaction: this.dispatchTransaction,
					handleDOMEvents: {
						'dragenter': ( view ) => {
							debug( 'Handle drag enter event...' );
							toggleCursorParking( view );
						},
						'drop': handleDrop
					}
				}));
			}
		} else {
			this.setView( null );
		}
	}

	recover() {
		debug( 'Try to recover from an error...' );
		if ( this.dispatchState.comm === 'recover' ) {
			this.dispatch({ type: 'polling' });
		}
	}

	poll() {
		const commentState = commentPlugin.getState( this.dispatchState.edit );
		const status = {
			version: getVersion( this.dispatchState.edit ),
			commentVersion: commentState.version
		};
		debug( 'Ask for collaborative editing events '+JSON.stringify( status )+'[comm='+this.dispatchState.comm+']' );
		this.props.session.pollCollaborativeEditingEvents( this.props.id, status );
	}

	setView( view ) {
		if ( this.view ) {
			this.view.destroy();
		}
		this.view = view;
	}

	// Send the given steps to the server
	send( editState, { steps, comments }) {
		debug( 'Send current actions to server...' );
		const json = {
			version: getVersion( editState ),
			steps: steps ? steps.steps.map( s => s.toJSON()) : [],
			clientID: steps ? steps.clientID : 0,
			comment: comments || []
		};
		this.props.session.sendCollaborativeEvents( this.props.id, json );
	}

	handleSendResponse( data ) {
		if ( data === 'invalid version' ) {
			debug( 'Went out of sync, trying to restart... ' );
			this.dispatch({ type: 'restart' });
		} else if ( data === 'version not current' ) {
			debug( 'Version is not current, wait for new data...' );
			this.dispatch({ type: 'polling' });
			this.poll();
		} else if ( !data ) {
			this.dispatch({ type: 'recover' });
		} else {
			const steps = data.steps.map( j => Step.fromJSON( schema, j ) );
			let tr = steps ?
				receiveTransaction(
					this.dispatchState.edit,
					steps,
					repeat( data.clientID, steps.length ),
					RECEIVE_OPTS
				) :
				this.dispatchState.edit.tr;
			tr.setMeta( commentPlugin, {
				type: 'receive',
				version: data.commentVersion || 0,
				events: [],
				sent: data.comment.length
			});
			this.dispatch({
				type: 'transaction',
				transaction:
				tr,
				requestDone: true
			});
		}
	}

	handlePollResponse( data ) {
		if ( data === 'invalid version' || data === 'history no longer available' ) {
			debug( 'Too far behind, reverting to server version of document...' );
			this.dispatch({ type: 'restart' });
		} else if ( !data ) {
			this.dispatch({ type: 'recover' });
		} else {
			debug( `Received response for version: ${data.version} and commentVersion: ${data.commentVersion}` );
			if ( data.steps && ( data.steps.length || data.comment.length ) ) {
				let tr = receiveTransaction(
					this.dispatchState.edit,
					data.steps.map(j => Step.fromJSON(schema, j)),
					data.clientIDs,
					RECEIVE_OPTS
				);
				tr.setMeta( commentPlugin, {
					type: 'receive',
					version: data.commentVersion,
					events: data.comment,
					sent: 0
				});
				this.dispatch({
					type: 'transaction', transaction: tr, requestDone: true
				});
			} else {
				this.dispatchTransaction({
					type: 'listening'
				});
			}
			this.nUsers = data.users;
		}
	}

	// eslint-disable-next-line
	sendable( editState ) {
		let steps = sendableSteps( editState );
		let comments = commentPlugin.getState( editState ).unsentEvents();
		if ( steps || comments.length ) {
			return { steps, comments };
		}
	}

	handleStart( data ) {
		if ( !data ) {
			return debug( 'Encountered error while starting. Aborting.' );
		}
		debug( `Starting with version: ${data.version} and commentVersion: ${data.commentVersion}` );
		this.dispatch({
			type: 'loaded',
			doc: schema.nodeFromJSON( data.doc ),
			version: data.version,
			users: data.users,
			comments: {
				version: data.commentVersion,
				comments: data.comments
			}
		});
	}

	onEditorState = ( editorState ) => {
		let nChars = 0;
		let nWords = 0;
		editorState.doc.forEach( blockNode => {
			blockNode.forEach( inlineNode => {
				if ( inlineNode.text ) {
					nChars += inlineNode.text.length;
					nWords += countWords( inlineNode.text );
				}
			});
		});
		this.nWords = nWords;
		this.nChars = nChars;
		this.props.onEditorState( editorState );
		this.forceUpdate();
	}

	dispatchTransaction = ( transaction ) => {
		this.dispatch({
			type: 'transaction',
			transaction
		});
	};

	render() {
		return ( <Fragment>
			<MenuBar
				menu={this.props.menu}
				state={this.dispatchState ? this.dispatchState.edit : null}
				dispatch={this.dispatchTransaction}
				view={this.view}
				fullscreen={this.props.fullscreen}
				showColorPicker={this.props.showColorPicker}
				onColorChoice={this.props.onColorChoice}
			/>
			<div ref={( div ) => {
				this.editorDiv = div;
				this.props.onMount( this.editorDiv );
			}} />
			<StatusBar
				nWords={this.nWords}
				nChars={this.nChars}
				nUsers={this.nUsers}
				docname={this.props.id}
			/>
		</Fragment> );
	}
}


// PROPERTIES //

ProseMirrorCollaborative.propTypes = {
	fullscreen: PropTypes.bool.isRequired,
	menu: PropTypes.object.isRequired,
	showColorPicker: PropTypes.bool.isRequired,
	session: PropTypes.object.isRequired,
	onColorChoice: PropTypes.func,
	onEditorState: PropTypes.func,
	onMount: PropTypes.func
};

ProseMirrorCollaborative.defaultProps = {
	onColorChoice() {},
	onEditorState() {},
	onMount() {}
};


// EXPORTS //

export default ProseMirrorCollaborative;