// MODULES //

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniq from 'uniq';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import ndarray from '@stdlib/ndarray/array';
import contains from '@stdlib/assert/contains';
import copy from '@stdlib/utils/copy';
import isArray from '@stdlib/assert/is-array';
import roundn from '@stdlib/math/base/special/roundn';
import abs from '@stdlib/math/base/special/abs';
import pnorm from '@stdlib/stats/base/dists/normal/cdf';
import SelectInput from 'components/input/select';
import CheckboxInput from 'components/input/checkbox';
import Tooltip from 'components/tooltip';
import { DATA_EXPLORER_LOGISTIC_REGRESSION } from 'constants/actions.js';
import subtract from 'utils/subtract';
import QuestionButton from './question_button.js';
import irls from './glm/logistic_regression.js';


// VARIABLES //

const DESCRIPTION = 'Predict a categorical response variable using one or more explanatory variables.';
let COUNTER = 0;


// FUNCTIONS //

function designMatrix( x, data, quantitative, intercept ) {
	let matrix = [];
	const predictors = [];
	const hash = {};
	const nobs = data[ x[ 0 ] ].length;
	for ( let j = 0; j < x.length; j++ ) {
		const values = data[ x[ j ] ];
		if ( contains( quantitative, x[ j ] ) ) {
			predictors.push( x[ j ] );
		} else {
			const categories = x[ j ].categories || uniq( values.slice() );
			for ( let k = intercept ? 1 : 0; k < categories.length; k++ ) {
				predictors.push( `${x[ j ]}_${categories[ k ]}` );
			}
			hash[ x[ j ] ] = categories;
		}
	}
	for ( let i = 0; i < nobs; i++ ) {
		const row = [];
		if ( intercept ) {
			row.push( 1 );
		}
		for ( let j = 0; j < x.length; j++ ) {
			const values = data[ x[ j ] ];
			if ( contains( quantitative, x[ j ] ) ) {
				row.push( values[ i ] );
			} else {
				const categories = hash[ x[ j ] ];
				const val = values[ i ];
				for ( let k = intercept ? 1 : 0; k < categories.length; k++ ) {
					row.push( ( val === categories[ k ] ) ? 1 : 0 );
				}
			}
		}
		matrix.push( row );
	}
	matrix = ndarray( matrix );
	return { matrix, predictors };
}

const summaryTable = ( x, intercept, result ) => {
	return (
		<Table bordered size="sm">
			<thead>
				<tr>
					<th>Predictor</th>
					<th>Coefficient</th>
					<th>Std. Error</th>
					<th>t</th>
					<th>p-value</th>
				</tr>
			</thead>
			<tbody>
				{ intercept ? <tr>
					<th>Intercept</th>
					<td>{result.coefficients[ 0 ].toFixed( 6 )}</td>
					<td>{result.stdErrors[ 0 ].toFixed( 4 )}</td>
					<td>{( result.coefficients[ 0 ] / result.stdErrors[ 0 ] ).toFixed( 4 )}</td>
					<td>{( 2.0 * pnorm( -abs( result.coefficients[ 0 ] / result.stdErrors[ 0 ] ), 0.0, 1.0 ) ).toFixed( 4 )}</td>
				</tr> : null }
				{x.map( ( name, idx ) => {
					idx = idx + Number( intercept );
					const tStat = result.coefficients[ idx ]/ result.stdErrors[ idx ];
					const pVal = 2.0 * pnorm( -abs( tStat ), 0.0, 1.0 );
					return (
						<tr key={idx} >
							<th>{name}</th>
							<td>{result.coefficients[ idx ].toFixed( 6 )}</td>
							<td>{result.stdErrors[ idx ].toFixed( 4 )}</td>
							<td>{tStat.toFixed( 4 )}</td>
							<td>{pVal.toFixed( 4 )}</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
};


// MAIN //

class LogisticRegression extends Component {
	constructor( props ) {
		super( props );

		let categories;
		let y;
		let success;
		if ( isArray( props.categorical ) && props.categorical.length > 0 ) {
			y = props.categorical[ 0 ];
			if ( y.categories ) {
				categories = y.categories;
			} else {
				categories = props.data[ y ].slice();
				uniq( categories );
			}
			success = categories[ categories.length-1 ];
		} else {
			categories = [];
			success = null;
		}
		this.state = {
			categories,
			y,
			success,
			x: props.quantitative[ 0 ],
			intercept: true
		};
	}

	compute = () => {
		COUNTER += 1;
		let { y, success, x, intercept } = this.state;
		const yvalues = this.props.data[ y ].map( v => {
			return v === success ? 1 : 0;
		});
		const n = yvalues.length;
		if ( !isArray( x ) ) {
			x = [ x ];
		}
		const { matrix, predictors } = designMatrix( x, this.props.data, this.props.quantitative, intercept );
		const results = irls( matrix, yvalues, n );
		this.props.logAction( DATA_EXPLORER_LOGISTIC_REGRESSION, {
			y, x, intercept
		});
		const output = {
			variable: 'Regression Summary',
			type: 'Logistic Regression',
			value: <div style={{ overflowX: 'auto', width: '100%' }}>
				<span className="title" >Regression Summary for Response {y} (model id: logis{COUNTER})</span>
				{summaryTable( predictors, intercept, results )}
				<i>The algorithm converged after {results.iterations} iterations</i>
				<p>Akaike Information Criterion (AIC): {roundn( results.aic, -3 )}</p>
				<Tooltip tooltip="Predictions and residuals will be attached to data table">
					<Button variant="secondary" size="sm" onClick={() => {
						const { matrix } = designMatrix( x, this.props.data, this.props.quantitative, intercept );
						const yhat = results.predict( matrix );
						const yvalues = this.props.data[ y ].map( v => {
							return v === success ? 1 : 0;
						});
						const resid = subtract( yhat, yvalues );
						const newData = copy( this.props.data, 1 );
						const newQuantitative = this.props.quantitative.slice();
						let name = 'pred_logis' + COUNTER;
						newData[ name ] = yhat;
						if ( !contains( newQuantitative, name ) ) {
							newQuantitative.push( name );
						}
						name = 'resid_logis' + COUNTER;
						if ( !contains( newQuantitative, name ) ) {
							newQuantitative.push( name );
						}
						newData[ name ] = resid;
						this.props.onGenerate( newQuantitative, newData );
					}}>Use this model to predict for currently selected data</Button>
				</Tooltip>
			</div>
		};
		this.props.onCreated( output );
	}

	render() {
		const { categorical, quantitative, data } = this.props;
		const { x, y, categories, success, intercept } = this.state;
		return (
			<Card
				style={{ fontSize: '14px' }}
			>
				<Card.Header as="h4">
					Logistic Regression<QuestionButton title="Logistic Regression" content={DESCRIPTION} />
				</Card.Header>
				<Card.Body>
					<Row>
						<Col md={6}>
							<SelectInput
								legend="Outcome (Y):"
								options={categorical}
								defaultValue={y}
								onChange={( y ) => {
									const categories = data[ y ].slice();
									uniq( categories );
									this.setState({
										categories,
										success: categories[ categories.length-1 ],
										y
									});
								}}
							/>
						</Col>
						<Col md={6}>
							<SelectInput
								legend="Success (Y = 1):"
								defaultValue={success}
								options={categories}
								onChange={( value ) => {
									this.setState({
										success: value
									});
								}}
							/>
						</Col>
					</Row>
					<SelectInput
						legend="Predictors (X):" multi
						options={quantitative.concat( categorical )}
						defaultValue={x || ''}
						onChange={( x ) => this.setState({ x })}
						closeMenuOnSelect={false}
						selectAllOption
					/>
					<CheckboxInput
						legend="Include intercept?"
						defaultValue={intercept}
						onChange={( intercept ) => this.setState({ intercept })}
					/>
					<Button disabled={!x || x.length === 0} variant="primary" block onClick={this.compute}>Calculate</Button>
				</Card.Body>
			</Card>
		);
	}
}


// PROPERTIES //

LogisticRegression.defaultProps = {
	logAction() {}
};

LogisticRegression.propTypes = {
	categorical: PropTypes.array.isRequired,
	quantitative: PropTypes.array.isRequired,
	data: PropTypes.object.isRequired,
	logAction: PropTypes.func,
	onGenerate: PropTypes.func.isRequired,
	onCreated: PropTypes.func.isRequired
};


// EXPORTS //

export default LogisticRegression;
