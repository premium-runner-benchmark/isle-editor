// MODULES //

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Panel from 'components/panel';
import NumberInput from 'components/input/number';
import sample from '@stdlib/random/sample';
import incrspace from '@stdlib/math/utils/incrspace';
import isEmptyObject from '@stdlib/assert/is-empty-object';
import isArray from '@stdlib/assert/is-array';
import isFunction from '@stdlib/assert/is-function';
import contains from '@stdlib/assert/contains';
import objectKeys from '@stdlib/utils/keys';
import noop from '@stdlib/utils/noop';
import './load_translations.js';


// MAIN //

/**
* Component to sample observations from a dataset and pass it to child components.
*/
class DataSampler extends Component {
	constructor( props ) {
		super( props );

		const variables = objectKeys( props.data );
		const { length: nobs } = props.data[ variables[ 0 ] ];

		this.state = {
			originalData: props.data,
			sampleSize: props.sampleSize,
			originalSampleSize: props.sampleSize,
			children: null,
			variables,
			nobs
		};
	}

	static getDerivedStateFromProps( nextProps, prevState ) {
		const newState = {};
		if ( nextProps.sampleSize !== prevState.originalSampleSize ) {
			newState.sampleSize = nextProps.sampleSize;
		}
		if ( nextProps.data !== prevState.originalData ) {
			const variables = objectKeys( nextProps.data );
			const { length: nobs } = nextProps.data[ variables[ 0 ] ];
			newState.nobs = nobs;
			newState.variables = variables;
			newState.originalData = nextProps.data;
		}
		if ( !isEmptyObject( newState ) ) {
			return newState;
		}
		return null;
	}

	handleNumberChange = ( val ) => {
		this.setState({
			sampleSize: val
		});
	}

	drawSample = () => {
		const indices = incrspace( 0, this.state.nobs, 1 );
		const sampleIds = sample( indices, {
			size: this.state.sampleSize,
			replace: false
		});
		const sampleData = {};
		const data = this.state.originalData;
		for ( let i = 0; i < this.state.variables.length; i++ ) {
			const key = this.state.variables[ i ];
			sampleData[ key ] = data[ key ].filter( ( _, i ) => {
				return contains( sampleIds, i );
			});
		}
		const key = `${sampleIds[ 0 ]}-${sampleIds[ 1 ]}-${sampleIds[ 2 ]}`;
		let fun = noop;
		if ( isFunction( this.props.children ) ) {
			fun = this.props.children;
		} else if ( isArray( this.props.children ) ) {
			for ( let i = 0; i < this.props.children.length; i++ ) {
				const child = this.props.children[ i ];
				if ( isFunction( child ) ) {
					fun = child;
					break;
				}
			}
		}
		this.setState({
			children: <div key={key} style={{ animation: 'roll-in-left 1s' }}>
				{fun( sampleData )}
			</div>
		});
	}

	render() {
		return (
			<div>
				<Panel style={{ maxWidth: 900 }}>
					<NumberInput
						legend={this.props.t('sample-size')}
						defaultValue={this.state.sampleSize}
						min={this.props.minSampleSize}
						max={this.props.maxSampleSize || this.state.nobs}
						step={1}
						onChange={this.handleNumberChange}
					/>
					<Button onClick={this.drawSample}>{this.props.t('draw-sample')}</Button>
				</Panel>
				{this.state.children}
			</div>
		);
	}
}


// PROPERTIES //

DataSampler.propTypes = {
	children: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired,
	sampleSize: PropTypes.number,
	minSampleSize: PropTypes.number,
	maxSampleSize: PropTypes.number
};

DataSampler.defaultProps = {
	sampleSize: 50,
	minSampleSize: 1,
	maxSampleSize: null
};


// EXPORTS //

export default withTranslation( 'data-sampler' )( DataSampler );
