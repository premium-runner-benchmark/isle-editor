// MODULES //

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import { PCA } from 'ml-pca';
import { withTranslation } from 'react-i18next';
import Table from 'components/table';
import incrspace from '@stdlib/math/utils/incrspace';
import { isPrimitive as isNumber } from '@stdlib/assert/is-number';
import isnan from '@stdlib/assert/is-nan';
import Plotly from 'components/plotly';
import './load_translations.js';


// FUNCTIONS //

function isNonMissingNumber( x ) {
	return isNumber( x ) && !isnan( x );
}

const summaryTable = ( stdev, variance, cumVariance ) => {
	return (
		<Table bordered size="sm">
			<thead>
				<tr>
					<th></th>
					<th>Standard Deviation</th>
					<th>Proportion of Variance</th>
					<th>Cumulative Variance Proportion</th>
				</tr>
			</thead>
			<tbody>
				{stdev.map( ( val, id ) => {
					return (
						<tr key={id}>
							<th> {`PC${id+1}`} </th>
							<td> {val.toFixed( 3 )} </td>
							<td> {variance[ id ].toFixed( 3 )} </td>
							<td> {cumVariance[ id ].toFixed( 3 )} </td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
};

const fitModel = ({ data, variables, scale, center, noComponents }) => {
	try {
		const matrix = [];
		const n = data[ variables[ 0 ] ].length;
		for ( let i = 0; i < n; i++ ) {
			const row = [];
			let missing = false;
			for ( let j = 0; j < variables.length; j++ ) {
				const val = data[ variables[ j ] ][ i ];
				if ( isNonMissingNumber( val ) ) {
					row.push( val );
				} else {
					missing = true;
					break;
				}
			}
			if ( !missing ) {
				matrix.push( row );
			}
		}
		const pca = new PCA( matrix, {
			center,
			scale
		});
		const components = pca.predict( matrix, {
			noComponents
		});
		return {
			pca,
			components
		};
	} catch ( _ ) {
		return {};
	}
};


// MAIN //

/**
* Principal component analysis.
*
* @property {Object} data - object of value arrays
* @property {Array<string>} variables - names of variables used for clustering
* @property {boolean} scale - scale values by dividing with the standard deviation
* @property {boolean} center - center values by subtracting the mean
* @property {number} noComponents - number of components supplied to the `onResult` callback
* @property {Function} onResult - callback invoked with model object and components
*/
class PrincipalComponentAnalysis extends Component {
	constructor( props ) {
		super( props );

		const { data, variables, scale, center, noComponents } = props;
		const { pca, components } = fitModel( { data, variables, scale, center, noComponents } );
		this.state = {
			pca,
			components,
			...props
		};
		if ( pca ) {
			props.onResult( this.state.pca, this.state.components );
		}
	}

	static getDerivedStateFromProps( nextProps, prevState ) {
		if (
			nextProps.data !== prevState.data ||
			nextProps.variables !== prevState.variables
		) {
			const { data, variables, scale, center, noComponents } = nextProps;
			const newState = {
				...fitModel( { data, variables, scale, center, noComponents } ),
				...nextProps
			};
			if ( newState.pca ) {
				nextProps.onResult( newState.pca, newState.components );
			}
			return newState;
		}
		return null;
	}

	render() {
		const { pca } = this.state;
		if ( !pca ) {
			return <Alert variant="danger">{this.props.t('missing-attributes')}</Alert>;
		}
		const stdev = pca.getStandardDeviations();
		const variance = pca.getExplainedVariance();
		const cumVariance = pca.getCumulativeVariance();
		const trace = {
			x: incrspace( 0, variance.length, 1 ),
			y: variance,
			type: 'scatter',
			name: 'Proportion of variance'
		};
		return (<div style={{ overflowX: 'auto', width: '100%' }}>
				<span className="title" >PCA Summary</span>
				{summaryTable( stdev, variance, cumVariance )}
				<Plotly editable data={[ trace ]} layout={{
					xaxis: {
						title: 'Principal Component'
					},
					yaxis: {
						title: 'Explained Proportion'
					}
				}} />
			</div>
		);
	}
}


// PROPERTIES //

PrincipalComponentAnalysis.defaultProps = {
	center: true,
	scale: false,
	noComponents: 0,
	onResult() {}
};

PrincipalComponentAnalysis.propTypes = {
	data: PropTypes.object.isRequired,
	variables: PropTypes.arrayOf( PropTypes.string ).isRequired,
	center: PropTypes.bool,
	scale: PropTypes.bool,
	noComponents: PropTypes.number,
	onResult: PropTypes.func
};


// EXPORTS //

export default withTranslation( 'pca' )( PrincipalComponentAnalysis );
