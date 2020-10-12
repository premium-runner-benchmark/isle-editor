// MODULES //

import React from 'react';
import TeX from 'components/tex';
import ztest from '@stdlib/stats/ztest';
import ttest from '@stdlib/stats/ttest';
import roundn from '@stdlib/math/base/special/roundn';
import replace from '@stdlib/string/replace';
import { isPrimitive as isNumber } from '@stdlib/assert/is-number';
import isnan from '@stdlib/assert/is-nan';
import stdev from 'utils/statistic/stdev';


// VARIABLES //

const RE_ONESIDED_SMALLER = /\d{2}% confidence interval: \[-Infinity,-?[\d.]+\]/;
const RE_ONESIDED_GREATER = /\d{2}% confidence interval: \[-?[\d.]+,Infinity\]/;


// FUNCTIONS //

function extractValues( data, variable ) {
	const x = data[ variable ];
	const arr = [];
	if ( !x ) {
		return arr;
	}
	for ( let i = 0; i < x.length; i++ ) {
		if ( isNumber( x[ i ] ) && !isnan( x[ i ] ) ) {
			arr.push( x[ i ] );
		}
	}
	return arr;
}


// MAIN //

function MeanTest({ data, variable, type, xstdev, alpha, direction, mu0, showDecision }) {
	const xvalues = extractValues( data, variable );
	let sd;
	if ( type === 'Z Test' && xstdev ) {
		sd = xstdev;
	} else {
		sd = roundn( stdev( xvalues ), -6 );
	}
	let result;
	if ( type === 'Z Test' ) {
		result = ztest( xvalues, sd, {
			'alpha': alpha,
			'alternative': direction,
			'mu': mu0
		});
	} else {
		result = ttest( xvalues, {
			'alpha': alpha,
			'alternative': direction,
			'mu': mu0
		});
	}
	let arrow = '\\ne';
	if ( direction === 'less' ) {
		arrow = '<';
	} else if ( direction === 'greater' ){
		arrow = '>';
	}
	let printout = result.print({
		decision: showDecision
	});
	printout = replace( printout, RE_ONESIDED_SMALLER, '' );
	printout = replace( printout, RE_ONESIDED_GREATER, '' );
	return (
		<div style={{ overflowX: 'auto', width: '100%' }}>
			<label>Hypothesis test for {variable}:</label>
			<TeX displayMode raw={`H_0: \\mu = ${mu0} \\; vs. \\; H_1: \\mu ${arrow} ${mu0}`} tag="" />
			<pre>
				{printout}
			</pre>
		</div>
	);
}


// EXPORTS //

export default MeanTest;