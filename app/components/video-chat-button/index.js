// MODULES //

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Tooltip from 'components/tooltip';
import VideoChat from 'components/video-chat';
import Gate from 'components/gate';
import SessionContext from 'session/context.js';
import { RECEIVED_JITSI_TOKEN, VIDEO_CHAT_INVITATION } from 'constants/events.js';


// MAIN //

/**
* A button for joining and leaving video chats.
*
* @property {string} for - chat room identifier
* @property {boolean} showTooltip - controls whether to show tooltip
* @property {string} size - button size
* @property {string} tooltipPlacement - position of button tooltip
* @property {Object} style - CSS inline styles
*/
class VideoChatButton extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			opened: false
		};
	}

	componentDidMount() {
		const session = this.context;
		this.unsubscribe = session.subscribe( ( type, value ) => {
			if ( type === VIDEO_CHAT_INVITATION ) {
				this.setState({
					opened: true
				});
			}
			else if ( type === RECEIVED_JITSI_TOKEN ) {
				this.forceUpdate();
			}
		});
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	toggleVideoChat = ( event ) => {
		this.setState({
			opened: !this.state.opened
		});
	}

	render() {
		const session = this.context;
		if ( !session.jitsi ) {
			return null;
		}
		let label;
		if ( this.props.buttonLabel ) {
			label = this.props.buttonLabel;
		} else {
			label = this.state.opened ? 'Leave Video' : 'Join Video';
		}
		let variant;
		if ( this.props.buttonVariant ) {
			variant = this.props.buttonVariant;
		} else {
			variant = this.state.opened ? 'success' : 'secondary';
		}
		let tooltip;
		if ( this.props.tooltip ) {
			tooltip = this.props.tooltip;
		} else {
			tooltip = `${this.state.opened ? 'Leave' : 'Join'} video chat with ID ${this.props.for}`;
		}
		let button = <Button
			variant={variant}
			size={this.props.size}
			className={this.props.className}
			onClick={this.toggleVideoChat}
			style={this.props.style}
		>
			<span style={{ pointerEvents: 'none' }} >
				{label}
			</span>
		</Button>;
		if ( this.props.showTooltip ) {
			button = <Tooltip
				tooltip={tooltip}
				placement={this.props.tooltipPlacement}
			>
				{button}
			</Tooltip>;
		}
		/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-static-element-interactions */
		return (
			<Gate user >
				<span onClick={this.props.onClick} >
					{button}
					{this.state.opened ? <VideoChat
						roomName={this.props.for}
						roomSubject={this.props.subject || this.props.for}
						onHide={this.toggleVideoChat}
					/> : null}
				</span>
			</Gate>
		);
	}
}


// PROPERTIES //

VideoChatButton.propTypes = {
	for: PropTypes.string.isRequired,
	subject: PropTypes.string,
	buttonLabel: PropTypes.node,
	showTooltip: PropTypes.bool,
	size: PropTypes.string,
	buttonVariant: PropTypes.string,
	tooltipPlacement: PropTypes.oneOf([ 'left', 'top', 'right', 'bottom' ]),
	onClick: PropTypes.func,
	className: PropTypes.string,
	style: PropTypes.object
};

VideoChatButton.defaultProps = {
	subject: null,
	buttonLabel: null,
	showTooltip: true,
	size: 'sm',
	buttonVariant: null,
	tooltipPlacement: 'top',
	onClick() {},
	className: '',
	style: {}
};

VideoChatButton.contextType = SessionContext;


// EXPORTS //

export default VideoChatButton;
