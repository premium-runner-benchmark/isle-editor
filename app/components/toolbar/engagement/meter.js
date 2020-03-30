// MODULES //

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ProgressBar from 'react-bootstrap/ProgressBar';
import incrmmean from '@stdlib/stats/incr/mmean';
import incrmrange from '@stdlib/stats/incr/mrange';
import roundn from '@stdlib/math/base/special/roundn';
import Draggable from 'components/draggable';
import Gate from 'components/gate';
import Panel from 'components/panel';
import Tooltip from 'components/tooltip';
import ResponsesTable from './responses_table.js';
import { SHARE_ENGAGEMENT } from 'constants/actions.js';
import { MEMBER_ACTION } from 'constants/events.js';
import ScoreSetter from './score_setter.js';


// MAIN //

/**
* An ISLE component that displays an engagement meter with which the students can indicate how well they are following the class.
*/
class EngagementMeter extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			mean: null,
			range: null,
			responses: []
		};
		this.id = props.id || 'engagement-meter';
		this.meanAcc = incrmmean( 6 );
		this.rangeAcc = incrmrange( 6 );
	}

	componentDidMount() {
		const session = this.props.session;
		if ( session ) {
			this.unsubscribe = session.subscribe( ( type, action ) => {
				if ( type === MEMBER_ACTION && action.id === this.id ) {
					if ( action.type === SHARE_ENGAGEMENT ) {
						const mean = this.meanAcc( action.value );
						const range = this.rangeAcc( action.value );
						const responses = this.state.responses.slice();
						responses.push({
							name: action.name,
							email: action.email,
							value: action.value
						});
						this.setState({
							mean, range, responses
						});
					}
				}
			});
		}
		if ( !session.isOwner() ) {
			const notification = session.addNotification({
				title: 'Poll',
				message: 'Please indicate your answer on below scale by dragging the orange bar',
				level: 'info',
				position: 'tc',
				dismissible: 'none',
				autoDismiss: 0,
				children: <ScoreSetter onSubmit={( progress ) => {
					const session = this.props.session;
					session.log({
						id: this.id,
						type: SHARE_ENGAGEMENT,
						value: progress
					});
					session.removeNotification( notification );
					session.addNotification({
						title: 'Answer recorded',
						message: 'Your answer was recorded successfully.',
						level: 'success',
						position: 'tc'
					});
				}} />
			});
		}
	}

	render() {
		return (
			<Gate owner>
				<Draggable>
					<Panel header={<span>
						<span className="unselectable" >Poll</span>
						{ this.props.onHide ?
							<Tooltip tooltip="Finish poll" >
								<button className="panel-hide-button fa fa-times" onClick={this.props.onHide} />
							</Tooltip> :
							null
						}
					</span>} className="engagement-meter-panel" >
						<div className="score-bottom" >
							{this.state.mean && this.state.range ?
								<Fragment>
									<ProgressBar style={{ marginTop: 23 }}>
										<ProgressBar animated variant="success" now={this.state.mean} />
										<ProgressBar animated variant="danger" now={100-this.state.mean} />
									</ProgressBar>
								</Fragment> : null }
						</div>
						{this.state.mean ?
							<p>mean: {roundn( this.state.mean, -2 )} (n: {this.state.responses.length})</p> : null
						}
						{this.state.range ?
							<p>range: {roundn( this.state.range, -2 )}</p> : null
						}
						<ResponsesTable
							responses={this.state.responses}
							session={this.props.session}
							renderValue={( row ) => {
								return row.value;
							}}
						/>
					</Panel>
				</Draggable>
			</Gate>
		);
	}
}


// PROPERTIES //

EngagementMeter.propTypes = {
	session: PropTypes.object.isRequired,
	onHide: PropTypes.func.isRequired
};


// EXPORTS //

export default EngagementMeter;
