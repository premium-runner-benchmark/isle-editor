// MODULES //

import React, { Component, Fragment } from 'react';
import logger from 'debug';
import { withTranslation } from 'react-i18next';
import Badge from 'react-bootstrap/Badge';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import isEmptyObject from '@stdlib/assert/is-empty-object';
import max from '@stdlib/math/base/special/max';
import isElectron from 'utils/is-electron';
import ActionLog from 'components/internal/statusbar/action-log';
import InstructorNotesEditor from 'components/internal/statusbar/instructor-notes-editor';
import animatePosition from 'utils/animate-position';
import Tooltip from 'components/tooltip';
import SessionContext from 'session/context.js';
import { RECEIVED_USERS, SELECTED_COHORT, USER_FINALLY_REMOVED, USER_JOINED, USER_LEFT } from 'constants/events.js';
import UserList from './user_list.js';
import ResponseVisualizers from './response_visualizers.js';
import StudentResponses from './student_responses.js';
import CohortSelect from './../cohort_select.js';
import './instructor_view.css';


// VARIABLES //

const EDITOR_OFFSET = isElectron ? 15 : 0;
const debug = logger( 'isle:statusbar-instructor-view' );


// MAIN //

class InstructorView extends Component {
	constructor( props, context ) {
		super( props );

		const hasResponseVisualizers = !isEmptyObject( context.responseVisualizers );
		this.state = {
			activeTab: hasResponseVisualizers ? 'response_visualizers' : 'active_users',
			hidden: true,
			rightPos: -max( window.innerWidth * 0.45, 400 ),
			selectedEmail: null,
			selectedID: null
		};
	}

	componentDidMount() {
		const session = this.context;
		this.unsubscribe = session.subscribe( ( type, value ) => {
			if (
				type === RECEIVED_USERS ||
				type === USER_JOINED ||
				type === USER_LEFT ||
				type === USER_FINALLY_REMOVED ||
				type === SELECTED_COHORT
			) {
				this.forceUpdate();
			}
		});
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	toggleHidden = () => {
		this.setState({
			hidden: !this.state.hidden
		});
	}

	toggleBar = () => {
		if ( this.state.hidden ) {
			this.toggleHidden();
			animatePosition( this.instructorView, 'right', EDITOR_OFFSET, 400 );
			this.handler.style.opacity = 0.7;
		} else {
			animatePosition( this.instructorView, 'right', this.state.rightPos, 400, this.toggleHidden );
			setTimeout( this.toggleHidden, 400 );
			this.handler.style.opacity = 0.7;
		}
	}

	onMouseOver = () => {
		if ( this.state.hidden ) {
			this.handler.style.opacity = 1.0;
		}
	}

	onMouseOut = () => {
		if ( this.state.hidden ) {
			this.handler.style.opacity = 0.7;
		}
	}

	renderTabs = () => {
		const session = this.context;
		if ( this.state.hidden ) {
			return null;
		}
		const hasResponseVisualizers = !isEmptyObject( session.responseVisualizers );
		return (
			<Tabs
				activeKey={this.state.activeTab}
				id="instructor-view-tabs"
				onSelect={( eventKey ) => {
					this.setState({
						activeTab: eventKey
					});
				}}
			>
				{ hasResponseVisualizers ? <Tab eventKey="response_visualizers" title={this.props.t( 'activity' )} >
					<ResponseVisualizers
						selectedCohort={session.selectedCohort}
						session={session}
						onThumbnailClick={( id ) => {
							debug( 'Go to actions with id '+id+'...' );
							this.setState({
								activeTab: 'action_log',
								selectedID: id
							});
						}}
						t={this.props.t}
					/>
				</Tab> : null }
				{ hasResponseVisualizers ? <Tab eventKey="student_responses" title={this.props.t( 'responses' )} >
					<StudentResponses
						selectedCohort={session.selectedCohort}
						session={session}
						t={this.props.t}
						activeTab={this.state.activeTab}
					/>
				</Tab> : null }
					<Tab eventKey="active_users" title={<span>{this.props.t( 'active-users' )}<Badge variant="secondary" style={{ marginLeft: 6 }} >{session.userList.length}</Badge></span>}>
					<UserList
						session={session}
						onThumbnailClick={( email ) => {
							debug( 'Go to actions from user '+email+'...' );
							this.setState({
								activeTab: 'action_log',
								selectedEmail: email
							});
						}}
						t={this.props.t}
					/>
				</Tab>
				<Tab eventKey="action_log" title={this.props.t( 'action-log' )} >
					<ActionLog
						selectedEmail={this.state.selectedEmail}
						selectedID={this.state.selectedID}
						t={this.props.t}
					/>
				</Tab>
				<Tab eventKey="instructor_notes" title={this.props.t( 'instructor-notes' )} >
					{ this.state.activeTab === 'instructor_notes' ? <InstructorNotesEditor /> : null }
				</Tab>
			</Tabs>
		);
	}

	render() {
		return (
			<Fragment>
				<div
					className="instructor-view unselectable"
					ref={( instructorView ) => { this.instructorView = instructorView; }}
					style={{
						right: this.state.rightPos,
						display: this.state.hidden ? 'none' : 'inherit',
						width: this.state.activeTab === 'student_responses' ? '65%' : '45%'
					}}
				>
					<div className="instructor-view-top">
						<h3 style={{ marginTop: '20px' }}>{this.props.t( 'instructor-panel' )}</h3>
						<hr style={{ background: '#333', backgroundImage: 'linear-gradient(to right, #ccc, #333, #ccc)', height: '1px', border: 0 }} />
					</div>
					<div className="instructor-view-middle">
						{this.renderTabs()}
						<CohortSelect
							id="instructor-view-cohort-select"
							label={this.props.t( 'only-show-users-from')}
							session={this.context}
							t={this.props.t}
						/>
					</div>
					<div className="instructor-view-bottom"></div>
				</div>
				<Tooltip tooltip={this.state.hidden ? this.props.t( 'instructor-panel-open' ) : this.props.t( 'instructor-panel-close' )} placement="left" >
					<div className="instructor-view-handler"
						role="button" tabIndex={0}
						aria-label={this.state.hidden ? this.props.t( 'instructor-panel-open' ) : this.props.t( 'instructor-panel-close' )}
						onClick={this.toggleBar} onKeyPress={this.toggleBar}
						onMouseOver={this.onMouseOver} onFocus={this.onMouseOver}
						onMouseOut={this.onMouseOut} onBlur={this.onMouseOut}
						ref={( handler ) => { this.handler = handler; }}
						style={{
							right: EDITOR_OFFSET + 12,
							borderWidth: this.state.hidden ? '15px 26px 15px 0' : '15px 0 15px 26px',
							borderColor: this.state.hidden ? 'transparent #c95d0a transparent transparent' : 'transparent transparent transparent #c95d0a'
						}}
					>
					</div>
				</Tooltip>
			</Fragment>
		);
	}
}


// TYPES //

InstructorView.contextType = SessionContext;


// EXPORTS //

export default withTranslation()( InstructorView );
