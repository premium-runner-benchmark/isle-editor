// MODULES //

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import maxScalar from '@stdlib/math/base/special/max';
import floor from '@stdlib/math/base/special/floor';
import { isPrimitive as isNumber } from '@stdlib/assert/is-number';
import isnan from '@stdlib/assert/is-nan';
import contains from '@stdlib/assert/contains';
import lowess from '@stdlib/stats/lowess';
import linspace from '@stdlib/math/utils/linspace';
import roundn from '@stdlib/math/base/special/roundn';
import CheckboxInput from 'components/input/checkbox';
import SelectInput from 'components/input/select';
import SliderInput from 'components/input/slider';
import Dashboard from 'components/dashboard';
import Plotly from 'components/plotly';
import randomstring from 'utils/randomstring/alphanumeric';
import max from 'utils/statistic/max';
import min from 'utils/statistic/min';
import { DATA_EXPLORER_SHARE_CONTOURPLOT, DATA_EXPLORER_CONTOURPLOT } from 'constants/actions.js';
import QuestionButton from './question_button.js';
import calculateCoefficients from './linear-regression/calculate_coefficients.js';


// VARIABLES //

const DESCRIPTION = 'A contour plot can be used to display the joint distribution of two quantitative variables. It plots a three-dimensional surface by plotting constant slices, called contours, on a two-dimensional grid.';


// FUNCTIONS //

function calculateOpacity(nobs) {
	return maxScalar( 0.05, 0.6 - floor( nobs / 500 ) );
}

export function generateContourChart({ data, xval, yval, overlayPoints, regressionMethod, smoothSpan }) {
	let xvals = data[ xval ];
	let yvals = data[ yval ];
	const trace1 = {
		x: xvals,
		y: yvals,
		mode: 'density',
		type: 'histogram2dcontour',
		colorscale: 'YIOrRd',
		showscale: false,
		reversescale: true
	};
	const traces = [ trace1 ];
	if ( overlayPoints ) {
		const trace2 = {
			x: xvals,
			y: yvals,
			mode: 'markers',
			name: 'points',
			marker: {
				color: '#1f77b4',
				opacity: calculateOpacity( xvals.length )
			},
			type: 'scatter'
		};
		traces.push(trace2);
	}
	if ( regressionMethod && regressionMethod.length > 0 ) {
		let xc = [];
		let yc = [];
		for ( let j = 0; j < xvals.length; j++ ) {
			let x = xvals[ j ];
			let y = yvals[ j ];
			if (
				isNumber( x ) && isNumber( y ) &&
				!isnan( x ) && !isnan( y )
			) {
				xc.push( x );
				yc.push( y );
			}
		}
		xvals = xc;
		yvals = yc;
		let predictedLinear;
		let predictedSmooth;
		let values;
		if ( contains( regressionMethod, 'linear' ) ) {
			values = linspace( min( xvals ), max( xvals ), 100 );
			const coefs = calculateCoefficients( xvals, yvals );
			predictedLinear = values.map( x => coefs[ 0 ] + coefs[ 1 ]*x );
			traces.push({
				x: values,
				y: predictedLinear,
				text: `${roundn( coefs[ 0 ], -6 )} + x * ${roundn( coefs[ 1 ], -6 )}`,
				mode: 'lines',
				name: 'Linear Fit',
				type: 'line',
				color: 'blue'
			});
		}
		if ( contains( regressionMethod, 'smooth' ) ) {
			const out = lowess( xvals, yvals, { 'f': smoothSpan } );
			values = out.x;
			predictedSmooth = out.y;
			traces.push({
				x: values,
				y: predictedSmooth,
				mode: 'lines',
				name: 'Smoothed Fit',
				type: 'line'
			});
		}
	}
	let layout = {
		title: `${xval} vs. ${yval}`,
		xaxis: {
			showgrid: true,
			zeroline: true,
			title: xval
		},
		yaxis: {
			showgrid: true,
			zeroline: true,
			title: yval
		}
	};
	return {
		layout,
		data: traces
	};
}


// MAIN //

class ContourChart extends Component {
	constructor( props ) {
		super( props );
	}

	generateContourChart( xval, yval, overlayPoints, regressionMethod, smoothSpan ) {
		const config = generateContourChart({ data: this.props.data, xval, yval, overlayPoints, regressionMethod, smoothSpan });
		const plotId = randomstring( 6 );
		const action = {
			xval, yval, overlayPoints, plotId
		};
		const output = {
			variable: `${xval} against ${yval}`,
			type: 'Chart',
			value: <Plotly
				editable
				draggable
				fit
				id={plotId}
				meta={action}
				data={config.data}
				layout={config.layout}
				onShare={() => {
					this.props.session.addNotification({
						title: 'Plot shared.',
						message: 'You have successfully shared your plot.',
						level: 'success',
						position: 'tr'
					});
					this.props.logAction( DATA_EXPLORER_SHARE_CONTOURPLOT, action );
				}}
				onSelected={( selected ) => {
					this.props.onSelected({ x: xval, y: yval }, selected );
				}}
			/>
		};
		this.props.logAction( DATA_EXPLORER_CONTOURPLOT, action );
		this.props.onCreated( output );
	}

	render() {
		const { variables, defaultX, defaultY } = this.props;
		return (
			<Dashboard autoStart={false} title={<span>Contour Chart<QuestionButton title="Contour Chart" content={DESCRIPTION} /></span>} onGenerate={this.generateContourChart.bind( this )}>
				<Row>
					<Col>
						<SelectInput
							legend="Variable on x-axis:"
							defaultValue={defaultX || variables[ 0 ]}
							options={variables}
						/>
					</Col>
					<Col>
						<SelectInput
							legend="Variable on y-axis:"
							defaultValue={defaultY || variables[ 1 ]}
							options={variables}
							menuPlacement="top"
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<CheckboxInput
							legend="Overlay observations"
							defaultValue={false}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<SelectInput
							legend="Overlay regression line?"
							defaultValue=""
							multi={true}
							options={[ 'linear', 'smooth' ]}
						/>
					</Col>
					<Col>
						<SliderInput
							legend="Smoothing Parameter"
							min={0.01}
							max={1}
							step={0.01}
							defaultValue={0.66}
						/>
					</Col>
				</Row>
			</Dashboard>
		);
	}
}


// DEFAULT PROPERTIES //

ContourChart.defaultProps = {
	defaultX: null,
	defaultY: null,
	logAction() {},
	onSelected() {},
	session: {}
};


// PROPERTIES //

ContourChart.propTypes = {
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

export default ContourChart;
