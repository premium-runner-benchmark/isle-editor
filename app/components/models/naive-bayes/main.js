// MODULES //

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Table from 'components/table';
import contains from '@stdlib/assert/contains';
import exp from '@stdlib/math/base/special/exp';
import Tooltip from 'components/tooltip';
import { gaussian } from './naive_bayes.js';
import { designMatrix, designMatrixMissing } from './design_matrix.js';
import './load_translations.js';


// VARIABLES //

let COUNTER = 0;


// FUNCTIONS //

const summaryTable = ( predictors, result, quantitative ) => {
	return (
		<div>
			<span className="title">A-priori probabilities:</span>
			<Table bordered size="sm">
				<thead>
					<tr>
						{result.classes.map( ( x, i ) => <th key={i}>{x}</th>)}
					</tr>
				</thead>
				<tbody>
					<tr>
						{result.classes.map( ( x, i ) => <th key={i}>{exp(result.prior[ x ]).toFixed( 3 )}</th>)}
					</tr>
				</tbody>
			</Table>
			<span className="title">Conditionals:</span>
			{predictors.map( ( pred, i ) => {
				if ( contains( quantitative, pred ) ) {
					return ( <Table bordered size="sm" key={i} >
						<thead>
							<tr>
								<th>{pred}</th>
								{result.classes.map( ( x, i ) => <th key={i}>{x}</th>)}
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>Mean</th>
								{result.classes.map( ( _, j ) => {
									return <td key={`${i}-${j}`}>{result.mu.get( i, j ).toFixed( 6 )}</td>;
								})}
							</tr>
							<tr>
								<th>SD</th>
								{result.classes.map( ( _, j ) => {
									return <td key={`${i}-${j}`}>{result.sigma.get( i, j ).toFixed( 6 )}</td>;
								})}
							</tr>
						</tbody>
					</Table> );
				}
				return ( <Table bordered size="sm" key={i} >
					<thead>
						<tr>
							<th>{pred}</th>
							{result.classes.map( ( x, i ) => <th key={i}>{x}</th>)}
						</tr>
					</thead>
					<tbody>
						<tr>
							<th>Yes</th>
							{result.classes.map( ( _, j ) => {
								return <td key={`${i}-${j}`}>{result.mu.get( i, j ).toFixed( 3 )}</td>;
							})}
						</tr>
						<tr>
							<th>No</th>
							{result.classes.map( ( _, j ) => {
								return <td key={`${i}-${j}`}>{(1-result.mu.get( i, j )).toFixed( 3 )}</td>;
							})}
						</tr>
					</tbody>
				</Table> );
			})}
		</div>
	);
};

const fitModel = ({ x, y, data, quantitative, omitMissing }) => {
	try {
		const designM = omitMissing ? designMatrixMissing : designMatrix;
		const { matrix, predictors, yvalues } = designM( x, y, data, quantitative );
		const result = gaussian( matrix, yvalues );
		return {
			result,
			predictors
		};
	} catch ( error ) {
		return {};
	}
};


// MAIN //

/**
* Naive Bayes assuming that the predictors given the class membership follow a normal distribution.
*
* @property {Object} data - object of value arrays
* @property {string} y - outcome variable
* @property {Array<string>} x - one or more predictor variables
* @property {Array<string>} quantitative - array of variables in `data` that are `quantitative`
* @property {boolean} omitMissing - controls whether to omit missing values
* @property {Function} onPredict - callback invoked with predictions and residuals after model fitting
*/
class NaiveBayes extends Component {
	constructor( props ) {
		super( props );

		COUNTER += 1;
		const { x, y, data, quantitative, omitMissing } = props;
		this.state = {
			...fitModel({ x, y, data, quantitative, omitMissing }),
			...props
		};
	}

	static getDerivedStateFromProps( nextProps, prevState ) {
		if (
			nextProps.data !== prevState.data ||
			nextProps.quantitative !== prevState.quantitative ||
			nextProps.x !== prevState.x ||
			nextProps.y !== prevState.y ||
			nextProps.omitMissing !== prevState.omitMissing
		) {
			const { x, y, data, quantitative, omitMissing } = nextProps;
			return {
				...fitModel({ x, y, data, quantitative, omitMissing }),
				...nextProps
			};
		}
		return null;
	}

	handlePrediction = () => {
		this.props.onPredict( this.state.result, COUNTER );
	}

	render() {
		const { result, predictors } = this.state;
		if ( !result ) {
			return <Alert variant="danger">{this.props.t('missing-attributes')}</Alert>;
		}
		return (
			<div style={{ overflowX: 'auto', width: '100%' }}>
				<span className="title" >Naive Bayes for Response {this.props.y} (model id: bayes{COUNTER})</span>
				{summaryTable( predictors, result, this.props.quantitative )}
				{this.props.onPredict ? <Tooltip tooltip="Predictions and residuals will be attached to data table">
					<Button variant="secondary" size="sm" onClick={this.handlePrediction} >Use this model to predict for currently selected data</Button>
				</Tooltip> : null}
			</div>
		);
	}
}


// PROPERTIES //

NaiveBayes.defaultProps = {
	omitMissing: false,
	onPredict: null
};

NaiveBayes.propTypes = {
	data: PropTypes.object.isRequired,
	y: PropTypes.string.isRequired,
	x: PropTypes.oneOfType([
		PropTypes.arrayOf( PropTypes.string ),
		PropTypes.string
	]).isRequired,
	quantitative: PropTypes.arrayOf( PropTypes.string ).isRequired,
	omitMissing: PropTypes.bool,
	onPredict: PropTypes.func
};


// EXPORTS //

export default withTranslation( 'naive-bayes' )( NaiveBayes );
