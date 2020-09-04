// MODULES //

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import max from '@stdlib/math/base/special/max';
import fmtPositiveTime from './positive_time.js';
import fmtNegativeTime from './negative_time.js';
import './timer.css';


// MAIN //

/**
* Displays a timer that will trigger a predefined callback when the time is up. An example use case is the timing of quizzes.
*
* @property {boolean} active - flag that can be toggled to start or pause the timer
* @property {number} duration - duration in seconds for the timer
* @property {boolean} invisible - controls whether the timer should be hidden
* @property {boolean} belowZero - controls whether timer continues counting after the duration is exhausted
* @property {string} id - the unique `string` ID for the timer. If an ID is set, the timer component is persistent over page refreshes
* @property {string} legend - text displayed in front of the timer
* @property {Object} style - CSS inline styles
* @property {Function} onTimeUp - callback invoked when the timer runs out
*/
class Timer extends Component {
	constructor( props ) {
		super( props );
		const storedTimeLeft = localStorage.getItem( this.getTimerId() );
		this.state = {
			timeLeft: storedTimeLeft || props.duration,
			duration: props.duration,
			finished: false
		};
	}

	static getDerivedStateFromProps( nextProps, prevState ) {
		if (
			nextProps.duration !== prevState.duration
		) {
			const newState = {};
			newState.duration = nextProps.duration;
			newState.timeLeft = nextProps.duration;
			return newState;
		}
		return null;
	}

	componentDidMount() {
		this.startCountdown();
	}

	componentDidUpdate( prevProps, prevState ) {
		// Check if the clock should be active:
		if (
			this.props.active &&
			!prevProps.active &&
			!this.state.countdown
		) {
			this.startCountdown();
		}
	}

	componentWillUnmount() {
		const { countdown } = this.state;
		// Cancel the countdown on unmount of component:
		if ( countdown ) {
			clearInterval( countdown );
		}
	}

	getTimerId() {
		const { id } = this.props;
		if ( !id ) {
			return null;
		}
		return `timer::${id}`;
	}

	startCountdown() {
		const countdown = setInterval( () => {
			// Decrement the time by 1:
			this.setState({
				timeLeft: this.state.timeLeft - 1
			});
			const id = this.getTimerId();
			if ( id ) {
				localStorage.setItem( id, this.state.timeLeft );
			}
			if ( !this.state.finished && this.state.timeLeft <= 0 ) {
				if ( !this.props.belowZero ) {
					clearInterval( countdown );
				}
				this.props.onTimeUp();
				this.setState({
					finished: true
				});
			}
		}, 1000 );

		// Store the countdown reference:
		this.setState({ countdown });
	}

	render() {
		if ( this.props.invisible ) {
			return null;
		}
		const format = this.state.timeLeft > 0 ? fmtPositiveTime : fmtNegativeTime;
		return (
			<div style={this.props.style} className={`timer-div ${this.state.timeLeft < 0 ? 'timer-danger' : 'timer-info'}`}>
				{this.props.legend}
				{format( this.props.belowZero ? this.state.timeLeft : max( this.state.timeLeft, 0 ) )}
			</div>
		);
	}
}


// PROPERTIES //

Timer.propTypes = {
	id: PropTypes.string,
	active: PropTypes.bool.isRequired,
	belowZero: PropTypes.bool,
	duration: PropTypes.number.isRequired,
	invisible: PropTypes.bool,
	legend: PropTypes.string,
	style: PropTypes.object,
	onTimeUp: PropTypes.func
};

Timer.defaultProps = {
	id: null,
	belowZero: false,
	invisible: false,
	legend: '',
	style: {},
	onTimeUp() {}
};


// EXPORTS //

export default Timer;