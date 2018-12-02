// MODULES //

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckboxInput from 'components/input/checkbox';
import SelectInput from 'components/input/select';
import Dashboard from 'components/dashboard';
import Plotly from 'components/plotly';
import randomstring from 'utils/randomstring/alphanumeric';
import max from '@stdlib/math/base/special/max';
import floor from '@stdlib/math/base/special/floor';
import kde2d from '@stdlib/stats/kde2d';
import QuestionButton from './question_button.js';


// VARIABLES //

const DESCRIPTION = 'A data display for quantitative variables in which data values are represented as colors. Regions with many observations are colored red, whereas regions without observations are colored in dark blue.';


// FUNCTIONS //

function calculateOpacity(nobs) {
	return max( 0.05, 0.6 - floor( nobs / 500 ) );
}

function toArrayArray( arr ) {
	const nRows = arr.shape[ 0 ];
	const nCols = arr.shape[ 1 ];
	const out = new Array( nRows );
	for ( let i = 0; i < nRows; i++ ) {
		const row = Array( nCols );
		for ( let j = 0; j < nCols; j++ ) {
			row[ j ] = arr.get( i, j );
		}
		out[ i ] = row;
	}
	return out;
}

export function generateHeatmapConfig({ data, xval, yval, overlayPoints }) {
	var x = data[ xval ];
	var y = data[ yval ];
	var out = kde2d( x, y );
	var traces = [
		{
			x: out.x,
			y: out.y,
			z: toArrayArray( out.z ),
			type: 'heatmap',
			showscale: false,
			transpose: true
		}
	];
	if ( overlayPoints ) {
		const points = {
			x: x,
			y: y,
			mode: 'markers',
			name: 'points',
			marker: {
				color: 'white',
				opacity: calculateOpacity(x.length)
			},
			type: 'scatter'
		};
		traces.push( points );
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

class HeatMap extends Component {
	constructor( props ) {
		super( props );
	}

	generateHeatmap( xval, yval, overlayPoints ) {
		const config = generateHeatmapConfig({ data: this.props.data, xval, yval, overlayPoints });
		const plotId = randomstring( 6 );
		const output ={
			variable: `${xval} against ${yval}`,
			type: 'Chart',
			value: <Plotly
				editable
				fit
				id={plotId}
				data={config.data}
				layout={config.layout}
				onShare={() => {
					this.props.session.addNotification({
						title: 'Plot shared.',
						message: 'You have successfully shared your plot.',
						level: 'success',
						position: 'tr'
					});
					this.props.logAction( 'DATA_EXPLORER_SHARE:HEATMAP', {
						xval, yval, overlayPoints, plotId
					});
				}}
				onSelected={( selected ) => {
					this.props.onSelected({ x: xval, y: yval }, selected );
				}}
			/>
		};
		this.props.logAction( 'DATA_EXPLORER:HEATMAP', {
			xval, yval, overlayPoints, plotId
		});
		this.props.onCreated( output );
	}

	render() {
		const { variables, defaultX, defaultY } = this.props;
		return (
			<Dashboard
				autoStart={false}
				title={<span>Heat Map<QuestionButton title="Heat Map" content={DESCRIPTION} /></span>}
				onGenerate={this.generateHeatmap.bind( this )}
			>
				<SelectInput
					legend="Variable on x-axis:"
					defaultValue={defaultX || variables[ 0 ]}
					options={variables}
				/>
				<SelectInput
					legend="Variable on y-axis:"
					defaultValue={defaultY || variables[ 1 ]}
					options={variables}
				/>
				<CheckboxInput
					legend="Overlay observations"
					defaultValue={false}
				/>
			</Dashboard>
		);
	}
}


// DEFAULT PROPERTIES //

HeatMap.defaultProps = {
	defaultX: null,
	defaultY: null,
	logAction() {},
	onSelected() {},
	session: {}
};


// PROPERTY TYPES //

HeatMap.propTypes = {
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

export default HeatMap;
