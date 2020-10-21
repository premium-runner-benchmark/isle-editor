// MODULES //

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Table from 'components/table';
import Tooltip from 'components/tooltip';
import { isPrimitive as isNumber } from '@stdlib/assert/is-number';
import isUndefinedOrNull from '@stdlib/assert/is-undefined-or-null';
import isnan from '@stdlib/assert/is-nan';
import objectValues from '@stdlib/utils/values';
import mapValues from '@stdlib/utils/map-values';
import incrsumabs2 from '@stdlib/stats/incr/sumabs2';
import tCDF from '@stdlib/stats/base/dists/t/cdf';
import abs from '@stdlib/math/base/special/abs';
import sqrt from '@stdlib/math/base/special/sqrt';
import mean from 'utils/statistic/mean';
import Plotly from 'components/plotly';
import { generateQQPlotConfig } from 'components/plots/qqplot';
import by2 from 'utils/by2';
import by from 'utils/by';
import './load_translations.js';


// VARIABLES //

let COUNTER = 0;


// FUNCTIONS //

function calculateCoefficients( x, y ) {
	const xmu = mean( x );
	const ymu = mean( y );
	let C1 = 0;
	let C2 = 0;
	const len = x.length;
	for ( let i = 0; i < len; i++ ) {
		let xdelta = x[ i ] - xmu;
		let ydelta = y[ i ] - ymu;
		C1 += xdelta * xdelta;
		C2 += xdelta * ydelta;
	}
	const slope = C2 / C1;
	const yint = ymu - slope*xmu;
	return [ yint, slope ];
}

function isMissing( x ) {
	return isnan( x ) || isUndefinedOrNull( x );
}

function isNonMissingNumber( x ) {
	return isNumber( x ) && !isnan( x );
}

function extractValues({ x, y, data, group, omitMissing }) {
	const xd = data[ x ];
	const yd = data[ y ];
	const groups = data[ group ];
	if ( omitMissing ) {
		const xvals = [];
		const yvals = [];
		const groupvals = [];
		if ( groups ) {
			for ( let i = 0; i < xd.length; i++ ) {
				if (
					!isMissing( groups[ i ] ) &&
					isNonMissingNumber( xd[ i ] ) &&
					isNonMissingNumber( yd[ i ] )
				) {
					xvals.push( xd[ i ] );
					yvals.push( yd[ i ] );
					groupvals.push( groups[ i ] );
				}
			}
		} else {
			for ( let i = 0; i < xd.length; i++ ) {
				if (
					isNonMissingNumber( xd[ i ] ) &&
					isNonMissingNumber( yd[ i ] )
				) {
					xvals.push( xd[ i ] );
					yvals.push( yd[ i ] );
				}
			}
		}
		return {
			xd: xvals,
			yd: yvals,
			groups: groupvals
		};
	}
	return {
		xd: xd,
		yd: yd,
		groups: groups
	};
}


// MAIN //

/**
* Simple linear regression.
*
* @property {Object} data - object of value arrays
* @property {string} x - explanatory variable
* @property {string} y - response variable
* @property {string} group - grouping variable
* @property {boolean} omitMissing - controls whether to omit missing values in model fitting
* @property {Function} onDiagnostics - callback invoked with diagnostic plots
* @property {Function} onPredict - callback invoked with fitted values and residuals
*/
class SimpleLinearRegression extends Component {
	constructor( props ) {
		super( props );

		COUNTER += 1;
		const { x, y, data, group, omitMissing } = props;
		this.state = extractValues({ x, y, data, group, omitMissing });
	}

	static getDerivedStateFromProps( nextProps, prevState ) {
		if (
			nextProps.data !== prevState.data ||
			nextProps.x !== prevState.x ||
			nextProps.y !== prevState.y ||
			nextProps.group !== prevState.group ||
			nextProps.omitMissing !== prevState.omitMissing
		) {
			const { x, y, intercept, omitMissing, data, group } = nextProps;
			return extractValues({ x, y, intercept, omitMissing, data, group } );
		}
		return null;
	}

	render() {
		const { xd, yd, groups } = this.state;
		const { x, y, group, data } = this.props;
		let output;
		try {
			if ( group ) {
				const xmeans = by( xd, groups, mean );
				const res = by2( xd, yd, groups, calculateCoefficients );
				output = <div style={{ overflowX: 'auto', width: '100%' }}>
					<label>Regression of {y} on {x}</label>
					<p>
						<i>Grouped by {group}:</i>
					</p>
					{objectValues( mapValues( res, ( elem, key ) => {
						const [ yint, slope ] = elem;
						const resAcc = incrsumabs2();
						const x2Acc = incrsumabs2();
						const x2mmAcc = incrsumabs2();
						const cdf = tCDF.factory( yd.length - 2 );
						for ( let i = 0; i < yd.length; i++ ) {
							const pred = yint + slope * xd[ i ];
							resAcc( pred - yd[ i ] );
							x2Acc( xd[ i ] );
							x2mmAcc( xd[ i ] - xmeans[ key ] );
						}
						const sigma2 = resAcc() / ( yd.length - 2 );
						const slopeVar = sigma2 / x2mmAcc();
						const slopeSE = sqrt( slopeVar );
						const interceptVar = ( (1/yd.length) * sigma2 * x2Acc() ) / x2mmAcc();
						const interceptSE = sqrt( interceptVar );
						const tSlope = slope / slopeSE;
						const tIntercept = yint / interceptSE;
						return (
							<div>
								<label>{key}:</label>
								<Table bordered size="sm" >
									<thead>
										<tr>
											<th>Variable</th>
											<th>Coefficient</th>
											<th>Std. Error</th>
											<th>t</th>
											<th>p-value</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Intercept</td>
											<td>{yint.toFixed( 4 )}</td>
											<td>{interceptSE.toFixed( 4 )}</td>
											<td>{tIntercept.toFixed( 4 )}</td>
											<td>{2.0 * (1.0-cdf( abs( tIntercept ) ) ).toFixed( 4 )}</td>
										</tr>
										<tr>
											<td>{x}</td>
											<td>{slope.toFixed( 4 )}</td>
											<td>{slopeSE.toFixed( 4 )}</td>
											<td>{tSlope.toFixed( 4 )}</td>
											<td>{2.0 * (1.0-cdf( abs( tSlope ) ) ).toFixed( 4 )}</td>
										</tr>
									</tbody>
								</Table>
							</div>
						);
					}) )}
					{ this.props.onPredict ? <Tooltip tooltip="Predictions and residuals will be attached to data table" >
						<Button variant="secondary" size="sm" onClick={() => {
							const xd = data[ x ];
							const yd = data[ y ];
							const yhat = new Float64Array( yd.length );
							const resid = new Float64Array( yd.length );
							const groups = data[ group ];
							for ( let i = 0; i < yhat.length; i++ ) {
								const [ yint, slope ] = res[ groups[ i ] ];
								yhat[ i ] = yint + slope * xd[ i ];
								resid[ i ] = yhat[ i ] - yd[ i ];
							}
							this.props.onPredict( yhat, resid, COUNTER );
						}}>Use this model to predict for currently selected data</Button>
					</Tooltip> : null }
					{ this.props.onDiagnostics ? <Button variant="secondary" size="sm" style={{ marginLeft: 6 }} onClick={() => {
						const xd = this.props.data[ x ];
						const yd = this.props.data[ y ];
						const yhat = new Float64Array( yd.length );
						const resid = new Float64Array( yd.length );
						const groups = this.props.data[ group ];
						for ( let i = 0; i < yhat.length; i++ ) {
							const [ yint, slope ] = res[ groups[ i ] ];
							yhat[ i ] = yint + slope * xd[ i ];
							resid[ i ] = yhat[ i ] - yd[ i ];
						}
						const qqPlot = {
							variable: 'QQ Plot of Residuals',
							type: 'Chart',
							value: <Plotly
								draggable
								editable fit
								{...generateQQPlotConfig( resid, 'residuals' )}
								meta={{ type: 'qqplot of regression residuals', x: xd, y: yd }}
							/>
						};
						const residualPlot = {
							variable: 'Residuals vs. Fitted',
							type: 'Chart',
							value: <Plotly
								draggable editable fit
								data={[
									{
										x: yhat,
										y: resid,
										mode: 'markers'
									}
								]}
								layout={{
									xaxis: {
										title: 'Fitted Values'
									},
									yaxis: {
										title: 'Residuals'
									},
									title: 'Residuals vs. Fitted'
								}}
								meta={{ type: 'regression residuals vs. fitted', x: xd, y: yd }}
							/>
						};
						this.props.onDiagnostics([ qqPlot, residualPlot ]);
					}} >
						Model Diagnostics
					</Button> : null }
				</div>;
			}
			else {
				const [ yint, slope ] = calculateCoefficients( xd, yd );
				const resAcc = incrsumabs2();
				const x2Acc = incrsumabs2();
				const x2mmAcc = incrsumabs2();
				const xmean = mean( xd );
				const cdf = tCDF.factory( yd.length - 2 );
				for ( let i = 0; i < yd.length; i++ ) {
					const pred = yint + slope * xd[ i ];
					resAcc( pred - yd[ i ] );
					x2Acc( xd[ i ] );
					x2mmAcc( xd[ i ] - xmean );
				}
				const sigma2 = resAcc() / ( yd.length - 2 );
				const slopeVar = sigma2 / x2mmAcc();
				const slopeSE = sqrt( slopeVar );
				const interceptVar = ( (1/yd.length) * sigma2 * x2Acc() ) / x2mmAcc();
				const interceptSE = sqrt( interceptVar );
				const tSlope = slope / slopeSE;
				const tIntercept = yint / interceptSE;
				output = <div style={{ overflowX: 'auto', width: '100%' }} >
					<label>Regression of {y} on {x} (model id: slm{COUNTER})</label>
					<Table bordered size="sm" >
						<thead>
							<tr>
								<th>Variable</th>
								<th>Coefficient</th>
								<th>Std. Error</th>
								<th>t</th>
								<th>p-value</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Intercept</td>
								<td>{yint.toFixed( 4 )}</td>
								<td>{interceptSE.toFixed( 4 )}</td>
								<td>{tIntercept.toFixed( 4 )}</td>
								<td>{2.0 * (1.0-cdf( abs( tIntercept ) ) ).toFixed( 4 )}</td>
							</tr>
							<tr>
								<td>{x}</td>
								<td>{slope.toFixed( 4 )}</td>
								<td>{slopeSE.toFixed( 4 )}</td>
								<td>{tSlope.toFixed( 4 )}</td>
								<td>{2.0 * (1.0-cdf( abs( tSlope ) ) ).toFixed( 4 )}</td>
							</tr>
						</tbody>
					</Table>
					{ this.props.onPredict ? <Tooltip tooltip="Predictions and residuals will be attached to data table">
						<Button variant="secondary" size="sm" onClick={() => {
							const xd = data[ x ];
							const yd = data[ y ];
							const yhat = new Array( yd.length );
							const resid = new Array( yd.length );
							for ( let i = 0; i < yhat.length; i++ ) {
								yhat[ i ] = yint + slope * xd[ i ];
								resid[ i ] = yhat[ i ] - yd[ i ];
							}
							this.props.onPredict( yhat, resid, COUNTER );
						}}>Use this model to predict for currently selected data</Button>
					</Tooltip> : null }
					{ this.props.onDiagnostics ? <Button variant="secondary" size="sm" style={{ marginLeft: 6 }} onClick={() => {
						const xd = this.props.data[ x ];
						const yd = this.props.data[ y ];
						const yhat = new Array( yd.length );
						const resid = new Array( yd.length );
						for ( let i = 0; i < yhat.length; i++ ) {
							yhat[ i ] = yint + slope * xd[ i ];
							resid[ i ] = yhat[ i ] - yd[ i ];
						}
						const qqPlot = <Plotly
							draggable
							editable fit
							{...generateQQPlotConfig( resid, 'residuals' )}
							meta={{ type: 'qqplot of regression residuals', x: xd, y: yd }}
						/>;
						const residualPlot = <Plotly
							draggable editable fit
							data={[
								{
									x: yhat,
									y: resid,
									mode: 'markers',
									type: yhat.length > 2000 ? 'scattergl' : 'scatter'
								}
							]}
							layout={{
								xaxis: {
									title: 'Fitted Values'
								},
								yaxis: {
									title: 'Residuals'
								},
								title: 'Residuals vs. Fitted'
							}}
							meta={{ type: 'regression residuals vs. fitted', x: xd, y: yd }}
						/>;
						this.props.onDiagnostics([ qqPlot, residualPlot ]);
					}} >
						Model Diagnostics
					</Button> : null }
				</div>;
			}
			return output;
		} catch ( _ ) {
			return <Alert variant="danger">{this.props.t('missing-attributes')}</Alert>;
		}
	}
}


// PROPERTIES //

SimpleLinearRegression.defaultProps = {
	group: null,
	omitMissing: false,
	onDiagnostics: null,
	onPredict: null
};

SimpleLinearRegression.propTypes = {
	data: PropTypes.object.isRequired,
	x: PropTypes.string.isRequired,
	y: PropTypes.string.isRequired,
	group: PropTypes.string,
	omitMissing: PropTypes.bool,
	onDiagnostics: PropTypes.func,
	onPredict: PropTypes.func
};


// EXPORTS //

export default withTranslation( 'simple-linear-regression' )( SimpleLinearRegression );