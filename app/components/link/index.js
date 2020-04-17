// MODULES //

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ContextMenuTrigger } from 'react-contextmenu';
import startsWith from '@stdlib/string/starts-with';
import SessionContext from 'session/context.js';
import LinkContextMenu from './contextmenu.js';


// MAIN //

/**
* A link component.
*
* @property {string} href - URL of website to link to
*/
class Link extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			url: null,
			href: null
		};
	}

	static getDerivedStateFromProps( nextProps, prevState ) {
		if ( nextProps.href !== prevState.href ) {
			const newState = {
				href: nextProps.href
			};
			if (
				!startsWith( nextProps.href, 'http' ) &&
				!startsWith( nextProps.href, 'mailto' )
			) {
				newState.url = 'http://'+nextProps.href;
			}
			else {
				newState.url = nextProps.href;
			}
			return newState;
		}
		return null;
	}

	render() {
		return (
			<Fragment>
				<ContextMenuTrigger
					holdToDisplay={-1}
					disableIfShiftIsPressed
					id={`${this.state.url}-context-menu`}
					renderTag="span"
				>
					<a
						href={this.state.url}
						target="_blank"
					>
						{this.props.children}
					</a>
				</ContextMenuTrigger>
				<LinkContextMenu
					session={this.context}
					url={this.state.url}
				/>
			</Fragment>
		);
	}
}


// PROPERTIES //

Link.propTypes = {
	href: PropTypes.string.isRequired // eslint-disable-line react/no-unused-prop-types
};

Link.contextType = SessionContext;


// EXPORTS //

export default Link;