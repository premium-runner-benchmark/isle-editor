// MODULES //

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import logger from 'debug';
import { OPEN_LINK } from 'constants/actions.js';


// VARIABLES //

const debug = logger( 'isle:link:contextmenu' );


// MAIN //

class LinkContextMenu extends Component {
	constructor( props ) {
		super( props );
	}

	copyToClipboard = ( event ) => {
		debug( 'Copying selection to clipboard... ' );
		navigator.clipboard.writeText( this.props.url );
	}

	textToSpeech = () => {
		const str = this.props.url;
		const session = this.props.session;
		const ssu = new SpeechSynthesisUtterance( str );
		ssu.lang = session.config.language || 'en-US';
		window.speechSynthesis.speak( ssu );
	}

	openInTab = () => {
		const url = this.props.url;
		debug( `Open ${url} in new tab` );
		window.open( url, '_blank' );
		const session = this.props.session;
		session.log({
			id: url,
			type: OPEN_LINK,
			value: 'tab'
		});
	}

	openInWindow = () => {
		const url = this.props.url;
		debug( `Open ${url} in new window` );
		window.open( url, '_blank', 'location=no,scrollbars=yes,status=yes' );
		const session = this.props.session;
		session.log({
			id: url,
			type: OPEN_LINK,
			value: 'window'
		});
	}

	render() {
		const menuItems = [
			<MenuItem key={0} onClick={this.copyToClipboard} >
				Copy link
			</MenuItem>,
			<MenuItem key={1} onClick={this.openInTab} >
				Open link in new tab
			</MenuItem>,
			<MenuItem key={2} onClick={this.openInWindow} >
				Open link in new window
			</MenuItem>,
			<MenuItem key={3} onClick={this.textToSpeech} >
				Read aloud
			</MenuItem>
		];
		return ( <ContextMenu
			id={`${this.props.url}-context-menu`}
		>
			{menuItems}
		</ContextMenu> );
	}
}


// PROPERTIES //

LinkContextMenu.propTypes = {
	url: PropTypes.string.isRequired,
	session: PropTypes.object.isRequired
};


// EXPORTS //

export default LinkContextMenu;