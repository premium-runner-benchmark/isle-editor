// MODULES //

import React from 'react';
import PropTypes from 'prop-types';
import startcase from '@stdlib/string/startcase';
import Plotly from 'components/plotly';
import mean from 'utils/statistic/mean';
import range from 'utils/statistic/range';


// VARIABLES //

const PURPLE_SCALE = [
	[ 0, '#feebe2' ],
	[ 0.2, '#fcc5c0' ],
	[ 0.4, '#fa9fb5' ],
	[ 0.6, '#f768a1' ],
	[ 0.8, '#c51b8a' ],
	[ 1, '#7a0177' ]
];


// FUNCTIONS //

export function generateMapConfig({ data, longitude, latitude, locations, locationmode, variable, scope, showLand }) {
	let traces = [];
	if ( longitude && latitude ) {
		const lon = data[ longitude ];
		const lat = data[ latitude ];
		let zoom = range( lon )[ 0 ];
		zoom = 1.0 / zoom;
		traces.push({
			type: 'scattermapbox',
			mode: 'markers',
			text: data[ variable ],
			marker: {
				opacity: 0.6,
				autocolorscale: false,
				colorscale: PURPLE_SCALE,
				color: data[ variable ]
			},
			lon,
			lat
		});
		return {
			data: traces,
			layout: {
				mapbox: {
					zoom,
					center: {
						lon: mean( lon ),
						lat: mean( lat )
					}
				},
				margin: {
					l: 10,
					r: 0,
					b: 0,
					t: 80,
					pad: 2
				}
			}
		};
	}
	if ( variable ) {
		traces.push({
			type: 'choropleth',
			locationmode,
			locations: data[ locations ],
			z: data[ variable ],
			autocolorscale: true
		});
		let title = 'Map';
		if ( variable ) {
			title += ` of ${variable}`;
		}
		if ( scope ) {
			title += ` ${variable ? 'in' : 'of'} ${startcase( scope )}`;
		}
		return {
			data: traces,
			layout: {
				title,
				geo: {
					scope,
					resolution: showLand ? 50 : 110,
					showframe: false,
					showrivers: showLand,
					showlakes: showLand,
					showland: showLand,
					showocean: showLand,
					showcoastlines: showLand
				},
				margin: {
					l: 0,
					r: 0,
					b: 0,
					t: 120,
					pad: 2
				}
			}
		};
	}
}


// MAIN //

function Map({ data, locationmode, longitude, latitude, locations, variable, scope, showLand, id, action, onShare }) {
	const config = generateMapConfig({ data, locationmode, longitude, latitude, locations, variable, scope, showLand });
	return (
		<Plotly
			editable id={id} fit draggable
			data={config.data} layout={config.layout}
			meta={action}
			onShare={onShare}
		/>
	);
}


// PROPERTIES //

Map.defaultProps = {
	scope: 'world',
	showLand: false,
	locations: null,
	longitude: null,
	latitude: null,
	locationmode: 'country names'
};

Map.propTypes = {
	data: PropTypes.object.isRequired,
	scope: PropTypes.oneOf([
		'world',
		'usa',
		'europe',
		'asia',
		'africa',
		'north america',
		'south america'
	]),
	locations: PropTypes.string,
	locationmode: PropTypes.oneOf([
		'ISO-3',
		'USA-states',
		'country names'
	]),
	longitude: PropTypes.string,
	latitude: PropTypes.string,
	showLand: PropTypes.bool
};


// EXPORTS //

/**
* A geographic map which can be either supplied location names or longitude/latitude values.
*
* @property {Object} data - object of value arrays for each variable
* @property {string} scope - scope of map to be displayed
* @property {string} locations - name of variable in `data` holding location names
* @property {string} locationmode - either `ISO-3`, `USA-states`, or `country names` denoting how values in `locations` are encoded
* @property {string} longitude - name of variable in `data` holding longitude values
* @property {string} latitude - name of variable in `data` holding latitude values
* @property {boolean} showLand - whether to show geographic features on map
*/
export default Map;
