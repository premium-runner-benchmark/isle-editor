// MODULES //

import React from 'react';
import PropTypes from 'prop-types';
import Table from 'components/table';
import objectKeys from '@stdlib/utils/keys';
import entries from '@stdlib/utils/entries';
import countBy from '@stdlib/utils/count-by';
import identity from '@stdlib/utils/identity-function';
import extractUsedCategories from 'utils/extract-used-categories';
import by from 'utils/by';


// VARIABLES //

const SORT_OPTS = {
	'numeric': true // Use numeric collation such that "1" < "2" < "10"...
};


// FUNCTIONS //

function getFrequencies( variable, x, calculateCounts, calculateRelative ) {
	const counts = countBy( x, identity );
	let keys;
	if ( variable.categories ) {
		keys = extractUsedCategories( counts, variable );
	} else {
		keys = objectKeys( counts );
		keys.sort( ( a, b ) => a.localeCompare( b, void 0, SORT_OPTS ) );
	}
	let freqs = new Array( keys.length );
	for ( let i = 0; i < keys.length; i++ ) {
		freqs[ i ] = counts[ keys[ i ] ];
	}
	let relativeFreqs;
	let absoluteFreqs;
	if ( calculateRelative ) {
		const totalCount = freqs.reduce( ( a, b ) => a + b );
		relativeFreqs = freqs.map( x => {
			return x / totalCount;
		});
	}
	if ( calculateCounts ) {
		absoluteFreqs = freqs;
	}
	return {
		keys,
		absoluteFreqs,
		relativeFreqs
	};
}

const frequencyTable = ( variable, freqs, nDecimalPlaces ) => {
	let nTotal = 0;
	if ( freqs.absoluteFreqs && !freqs.relativeFreqs ) {
		return (
			<Table bordered size="sm">
				<thead>
					<tr>
						<th className="not-sortable" >{variable}</th>
						<th>Category</th>
						<th>Count</th>
					</tr>
				</thead>
				<tbody>
					{freqs.absoluteFreqs.map( ( count, id ) => {
						nTotal += count;
						return ( <tr key={id}>
							<td></td>
							<td>{freqs.keys[ id ]}</td>
							<td>{count}</td>
						</tr> );
					})}
				</tbody>
				<tbody>
					<tr key="total">
						<th>Total</th>
						<td></td>
						<td>{nTotal}</td>
					</tr>
				</tbody>
			</Table>
		);
	}
	if ( !freqs.absoluteFreqs && freqs.relativeFreqs ) {
		return ( <Table bordered size="sm">
			<thead>
				<tr>
					<th className="not-sortable" >{variable}</th>
					<th>Category</th>
					<th>Relative Frequency</th>
				</tr>
			</thead>
			<tbody>
				{freqs.relativeFreqs.map( ( count, id ) => {
					nTotal += count;
					return ( <tr key={id}>
						<td></td>
						<td>{freqs.keys[ id ]}</td>
						<td>{count.toFixed( nDecimalPlaces )}</td>
					</tr> );
				})}
			</tbody>
			<tbody>
				<tr key="total">
					<th>Total</th>
					<td></td>
					<td>1.0</td>
				</tr>
			</tbody>
		</Table> );
	}
	return (
		<Table bordered size="sm">
			<thead>
				<tr>
					<th className="not-sortable" >{variable}</th>
					<th>Category</th>
					<th>Count (Relative Frequency)</th>
				</tr>
			</thead>
			<tbody>
				{freqs.absoluteFreqs.map( ( count, id ) => {
					const relFreq = freqs.relativeFreqs[ id ];
					nTotal += count;
					return ( <tr key={id}>
						<td></td>
						<td>{freqs.keys[ id ]}</td>
						<td>{count} ({relFreq.toFixed( nDecimalPlaces )})</td>
					</tr> );
				})}
			</tbody>
			<tbody>
				<tr key="total">
					<th>Total</th>
					<td></td>
					<td>{nTotal} (1.0)</td>
				</tr>
			</tbody>
		</Table>
	);
};

const groupedFrequencyTable = ( variable, freqs, nDecimalPlaces ) => {
	return (
		<div style={{ overflowX: 'auto', width: '100%' }}>
			<label>{variable}: </label>
			{entries( freqs ).map( ( arr, i ) => {
				const relativeFreqs = arr[ 1 ].relativeFreqs;
				const absoluteFreqs = arr[ 1 ].absoluteFreqs;
				const categories = arr[ 1 ].keys.map(
					( x, j ) => <td key={j}>{x}</td>
				);
				let counts;
				if ( absoluteFreqs && !relativeFreqs ) {
					let nTotal = 0;
					counts = absoluteFreqs.map( ( x, j ) => {
						const count = x || 0;
						nTotal += count;
						return ( <td key={j}>
							{ count }
						</td> );
					});
					counts.push( <td key="total">{nTotal}</td> );
				}
				else if ( !absoluteFreqs && relativeFreqs ) {
					counts = relativeFreqs.map( ( x, j ) => {
						const count = x || 0;
						return ( <td key={j}>
							{ count.toFixed( nDecimalPlaces ) }
						</td> );
					});
					counts.push( <td key="total">1.0</td> );
				}
				else if ( absoluteFreqs && relativeFreqs ) {
					let nTotal = 0;
					counts = absoluteFreqs.map( ( x, j ) => {
						const count = x || 0;
						nTotal += count;
						return ( <td key={j}>
							{count} ({relativeFreqs[ j ].toFixed( nDecimalPlaces )})
						</td> );
					});
					counts.push( <td key="total">{nTotal} (1.0)</td> );
				}
				return ( <div key={i} >
					<label>{arr[ 0 ]}: </label>
					<Table bordered size="sm">
						<thead>
							<tr>
								<th>Category</th>
								{categories}
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>{ relativeFreqs && !absoluteFreqs ? 'Relative' : 'Count' }</th>
								{counts}
							</tr>
						</tbody>
					</Table>
				</div> );
			})}
		</div>
	);
};


// MAIN //

function FrequencyTable({ data, variable, group, calculateCounts, calculateRelative, nDecimalPlaces }) {
	let freqs;
	if ( !group ) {
		freqs = getFrequencies( variable, data[ variable ], calculateCounts, calculateRelative );
	} else {
		freqs = by( data[ variable ], data[ group ], ( arr ) => {
			return getFrequencies( variable, arr, calculateCounts, calculateRelative );
		});
		if ( group.categories ) {
			// Create new object with different insertion order:
			const tmp = {};
			for ( let i = 0; i < group.categories.length; i++ ) {
				if ( freqs[ group.categories[ i ] ] ) {
					tmp[ group.categories[ i ] ] = freqs[ group.categories[ i ] ];
				}
			}
			freqs = tmp;
		}
	}
	if ( !group ) {
		return frequencyTable( variable, freqs, nDecimalPlaces );
	}
	return groupedFrequencyTable( variable, freqs, nDecimalPlaces );
}


// PROPERTIES //

FrequencyTable.defaultProps = {
	calculateCounts: true,
	calculateRelative: false,
	nDecimalPlaces: 3,
	group: null
};

FrequencyTable.propTypes = {
	data: PropTypes.object.isRequired,
	variable: PropTypes.string.isRequired,
	calculateCounts: PropTypes.bool,
	calculateRelative: PropTypes.bool,
	group: PropTypes.string,
	nDecimalPlaces: PropTypes.number
};


// EXPORTS //

/**
* A frequency table.
*
* @property {Object} data - object of value arrays
* @property {string} variable - name of variable to be displayed
* @property {string} group - name of grouping variable
* @property {boolean} calculateCounts - controls whether to display absolute counts
* @property {boolean} calculateRelative - controls whether to display relative frequencies
* @property {number} nDecimalPlaces - number of decimal places for relative frequencies displayed in table
*/
export default FrequencyTable;
