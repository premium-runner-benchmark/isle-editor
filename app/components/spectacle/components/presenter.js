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

import React, { Children, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import { getSlideByIndex } from '../utils/slides';
import Time from './time';
import { SpectacleContext } from '../utils/context';
import './presenter.css';


// MAIN //

class Presenter extends Component {
	getCurrentSlide() {
		return this.props.route.slide;
	}

	_getSlideByIndex(index) {
		return getSlideByIndex(
			Children.toArray(this.props.slides),
			this.props.slideReference,
			index
		);
	}

	_renderMainSlide() {
		const { slideIndex, hash, lastSlideIndex } = this.props;
		const child = this._getSlideByIndex(slideIndex);
		const presenterStyle = {
			position: 'relative'
		};
		return cloneElement(child, {
			key: slideIndex,
			hash,
			export: this.props.route.params.indexOf('export') !== -1,
			slideIndex,
			lastSlideIndex,
			transition: [],
			transitionIn: [],
			transitionOut: [],
			transitionDuration: 0,
			presenter: true,
			presenterStyle
		});
	}

	_renderNextSlide() {
		const { slideIndex, lastSlideIndex } = this.props;
		const presenterStyle = {
			position: 'relative'
		};
		const child = this._getSlideByIndex(slideIndex + 1);
		return child ? (
			cloneElement(child, {
				export: this.props.route.params.indexOf('export') !== -1,
				key: slideIndex + 1,
				hash: child.props.id || slideIndex + 1,
				slideIndex: slideIndex + 1,
				lastSlideIndex,
				transition: [],
				transitionIn: [],
				transitionOut: [],
				transitionDuration: 0,
				presenterStyle,
				presenter: true,
				appearOff: true
			})
		) : (
			<h1 className="spectacle-end-header">END</h1>
		);
	}

	_renderNotes() {
		let notes;
		const currentSlide = this.getCurrentSlide();
		if ( this.context.notes[currentSlide] ) {
			notes = this.context.notes[currentSlide];
		} else {
			const child = this._getSlideByIndex(this.props.slideIndex);
			notes = child.props.notes;
		}
		if ( !notes ) {
			return false;
		}
		if ( typeof notes === 'string' ) {
			return <div dangerouslySetInnerHTML={{ __html: notes }} />;
		}
		return <div>{notes}</div>;
	}

	render() {
		return (
			<div className="spectacle-presenter-content" >
				<div className="spectacle-header-container" >
					<h2 className="spectacle-slide-info" >
						Slide {this.props.slideIndex + 1} of{' '}
						{this.props.slideReference.length}
					</h2>
					<Time timer={this.props.timer} />
				</div>
				<div className="spectacle-content-container" >
					<div className="spectacle-preview-pane" >
						<div className="spectacle-presenter-main spectacle-preview-current-slide">
							{this._renderMainSlide()}
						</div>
						<div className="spectacle-preview-next-slide">
							{this._renderNextSlide()}
						</div>
					</div>
					<div className="spectacle-notes" >{this._renderNotes()}</div>
				</div>
			</div>
		);
	}
}


// PROPERTIES //

Presenter.propTypes = {
	hash: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	lastSlideIndex: PropTypes.number,
	route: PropTypes.object,
	slideIndex: PropTypes.number,
	slideReference: PropTypes.array,
	slides: PropTypes.array,
	timer: PropTypes.bool
};

Presenter.contextType = SpectacleContext;


// EXPORTS //

export default Presenter;