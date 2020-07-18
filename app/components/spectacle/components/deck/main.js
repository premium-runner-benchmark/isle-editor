/* eslint-disable react/require-default-props */

/*
* The MIT License (MIT)
*
* Copyright (c) 2013-2018 Formidable Labs, Inc.
*
* Copyright (c) 2016-2018 Zachary Maybury, Kylie Stewart, and potentially other
* DefinitelyTyped contributors
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of
* this software and associated documentation files (the "Software"), to deal in
* the Software without restriction, including without limitation the rights to
* use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
* the Software, and to permit persons to whom the Software is furnished to do so,
* subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
* FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
* COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
* IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
* CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// MODULES //

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Controller from './../../utils/controller';
import Manager from './../manager';


// EXPORTS //

export function defaultOnStateChange( prevState, nextState ) {
	if ( nextState ) {
		document.documentElement.classList.add( nextState );
	}
	if ( prevState ) {
		document.documentElement.classList.remove( prevState );
	}
}

export default class Deck extends Component {
	static displayName = 'Deck';

	static propTypes = {
		autoplay: PropTypes.bool,
		autoplayDuration: PropTypes.number,
		autoplayLoop: PropTypes.bool,
		autoplayOnStart: PropTypes.bool,
		children: PropTypes.node,
		controls: PropTypes.bool,
		disableKeyboardControls: PropTypes.bool,
		disableTouchControls: PropTypes.bool,
		history: PropTypes.object,
		onStateChange: PropTypes.func,
		progress: PropTypes.oneOf(['bar', 'number', 'none']),
		showFullscreenControl: PropTypes.bool,
		transition: PropTypes.array,
		transitionDuration: PropTypes.number
	};

	static defaultProps = {
		onStateChange: defaultOnStateChange,
		showFullscreenControl: true
	};

	state = {
		slideState: void 0,
		fragments: {},
		route: {
			slide: null,
			params: []
		},
		notes: {}
	};

	componentWillUnmount() {
		// Cleanup default onStateChange
		if (this.state.slideState && !this.props.onStateChange) {
			document.documentElement.classList.remove(this.state.slideState);
		}
	}

	addFragment = ( action ) => {
		const { id, slide } = action;
		const fragments = { ...this.state.fragments };
		fragments[slide] = fragments[slide] || {};
		fragments[slide][id] = action.payload;
		this.setState({
			fragments
		});
	}

	updateFragment = (action) => {
		const { fragment } = action;
		const fragments = { ...this.state.fragments };
		fragments[ fragment.slide ][fragment.id].animations =
			action.payload.animations;
		this.setState({
			fragments
		});
	}

	updateRoute = ( action ) => {
		const { location, slideCount } = action;
		const slideHash = location.pathname.replace(/\//g, '');
		let slide;

		if ( isNaN( parseInt( slide, 10 ) ) ) {
			slide = slideHash;
		} else {
			const proposedSlideIndex = parseInt(
				location.pathname.replace( /\//g, '' ), 10
			);
			const isWithinBounds =
				proposedSlideIndex < slideCount && proposedSlideIndex >= 0;
			slide = isWithinBounds ? proposedSlideIndex : 0;
		}
		return this.setState({
			route: {
				slide,
				params: location.search.replace('?', '').split('&')
			}
		});
	}

	updateNotes = ( newNotes, slide = null ) => {
		const notes = { ...this.state.notes };
		notes[ slide || this.getCurrentSlide() ] = newNotes;
		this.setState({ notes });
	}

	handleStateChange = nextState => {
		const prevState = this.state.slideState;
		if ( prevState !== nextState ) {
			console.log( 'Processing state change...' );
			this.props.onStateChange( prevState, nextState );
			this.setState({ slideState: nextState });
		}
	}

	render() {
		console.log( 'TRANS')
		console.log( this.props.transition )
		return (
			<Controller
				updateRoute={this.updateRoute}
				updateNotes={this.updateNotes}
				route={this.state.route}
				history={this.props.history}
				notes={this.state.notes}
				onStateChange={this.handleStateChange}
				contentHeight={this.props.contentHeight}
				contentWidth={this.props.contentWidth}
			>
				<Manager
					{...this.props}
					route={this.state.route}
					updateFragment={this.updateFragment}
					fragments={this.state.fragments}
				>{this.props.children}</Manager>
			</Controller>
		);
	}
}
