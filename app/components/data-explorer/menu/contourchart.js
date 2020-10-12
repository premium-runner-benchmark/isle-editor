// MODULES //

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import contains from '@stdlib/assert/contains';
import CheckboxInput from 'components/input/checkbox';
import SelectInput from 'components/input/select';
import SliderInput from 'components/input/slider';
import ContourChart from 'components/plots/contourchart';
import randomstring from 'utils/randomstring/alphanumeric';
import { DATA_EXPLORER_SHARE_CONTOURPLOT, DATA_EXPLORER_CONTOURPLOT } from 'constants/actions.js';
import QuestionButton from '../question_button.js';


// VARIABLES //

const DESCRIPTION = 'A contour plot can be used to display the joint distribution of two quantitative variables. It plots a three-dimensional surface by plotting constant slices, called contours, on a two-dimensional grid.';


// MAIN //

class ContourChartMenu extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			xval: props.defaultX || props.variables[ 0 ],
			yval: props.defaultY || props.variables[ 1 ],
			overlayPoints: false,
			regressionMethod: [],
			smoothSpan: 0.66
		};
	}

	generateContourChart = () => {
		const { xval, yval, overlayPoints, regressionMethod, smoothSpan } = this.state;
		const plotId = randomstring( 6 );
		const action = {
			xval, yval, overlayPoints, regressionMethod, smoothSpan, plotId
		};
		const onShare = () => {
			this.props.session.addNotification({
				title: 'Plot shared.',
				message: 'You have successfully shared your plot.',
				level: 'success',
				position: 'tr'
			});
			this.props.logAction( DATA_EXPLORER_SHARE_CONTOURPLOT, action );
		};
		const output = <ContourChart
			id={plotId}
			action={action}
			data={this.props.data}
			onShare={onShare}
			xval={xval}
			yval={yval}
			overlayPoints={overlayPoints}
			regressionMethod={regressionMethod}
			smoothSpan={smoothSpan}
			onSelected={this.props.onSelected}
		/>;
		this.props.logAction( DATA_EXPLORER_CONTOURPLOT, action );
		this.props.onCreated( output );
	}

	render() {
		const { variables } = this.props;
		return (
			<Card style={{ minWidth: 650 }}>
				<Card.Header as="h4" >
					Contour Chart<QuestionButton title="Contour Chart" content={DESCRIPTION} />
				</Card.Header>
				<Card.Body>
					<Row>
						<Col>
							<SelectInput
								legend="Variable on x-axis:"
								defaultValue={this.state.xval}
								options={variables}
								onChange={( value ) => {
									this.setState({
										xval: value
									});
								}}
							/>
						</Col>
						<Col>
							<SelectInput
								legend="Variable on y-axis:"
								defaultValue={this.state.yval}
								options={variables}
								menuPlacement="top"
								onChange={( value ) => {
									this.setState({
										yval: value
									});
								}}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							<CheckboxInput
								legend="Overlay observations"
								defaultValue={this.state.overlayPoints}
								onChange={() => {
									this.setState({
										overlayPoints: !this.state.overlayPoints
									});
								}}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							<SelectInput
								legend="Overlay regression line?"
								defaultValue={this.state.regressionMethod}
								multi={true}
								options={[ 'linear', 'smooth' ]}
								onChange={( value ) => {
									this.setState({
										regressionMethod: value
									});
								}}
							/>
						</Col>
						<Col>
							<SliderInput
								legend="Smoothing Parameter"
								min={0.01}
								max={1}
								step={0.01}
								defaultValue={this.state.smoothSpan}
								disabled={!contains( this.state.regressionMethod, 'smooth' )}
								onChange={( value ) => {
									this.setState({
										smoothSpan: value
									});
								}}
							/>
						</Col>
					</Row>
					<Button variant="primary" block onClick={this.generateContourChart}>Generate</Button>
				</Card.Body>
			</Card>
		);
	}
}


// PROPERTIES //

ContourChartMenu.defaultProps = {
	defaultX: null,
	defaultY: null,
	logAction() {},
	onSelected() {},
	session: {}
};

ContourChartMenu.propTypes = {
	data: PropTypes.object.isRequired,
	defaultX: PropTypes.string,
	defaultY: PropTypes.string,
	logAction: PropTypes.func,
	onCreated: PropTypes.func.isRequired,
	onSelected: PropTypes.func,
	session: PropTypes.object,
	variables: PropTypes.array.isRequired
};


// EXPORTS //

export default ContourChartMenu;