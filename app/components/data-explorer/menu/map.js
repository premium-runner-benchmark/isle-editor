// MODULES //

import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SelectInput from 'components/input/select';
import Dashboard from 'components/dashboard';
import CheckboxInput from 'components/input/checkbox';
import randomstring from 'utils/randomstring/alphanumeric';
import Map from 'components/plots/map';
import { DATA_EXPLORER_SHARE_MAP, DATA_EXPLORER_MAP } from 'constants/actions.js';
import QuestionButton from './../question_button.js';


// VARIABLES //

const SCOPES = [
	'world',
	'usa',
	'europe',
	'asia',
	'africa',
	'north america',
	'south america'
];
const LOCATION_MODES = [
	'ISO-3',
	'USA-states',
	'country names'
];


// MAIN //

const MapMenu = ( props ) => {
	const { variables, groupingVariables, t } = props;
	const generateMap = ( locations, locationmode, scope, showLand, longitude, latitude, variable ) => {
		const plotId = randomstring( 6 );
		const action = {
			variable,
			longitude,
			latitude,
			locations,
			scope,
			showLand,
			plotId
		};
		const onShare = () => {
			props.session.addNotification({
				title: t('plot-shared'),
				message: t('plot-shared-message'),
				level: 'success',
				position: 'tr'
			});
			props.logAction( DATA_EXPLORER_SHARE_MAP, action );
		};
		const output = <Map
			data={props.data} variable={variable} locations={locations}
			longitude={longitude} latitude={latitude} locationmode={locationmode}
			scope={scope} showLand={showLand}
			id={plotId} action={action} onShare={onShare}
		/>;
		props.logAction( DATA_EXPLORER_MAP, action );
		props.onCreated( output );
	};
	return (
		<Dashboard
			autoStart={false}
			title={<span>
				{t('Map')}
				<QuestionButton title={t('Map')} content={t('Map-description')} />
			</span>}
			onGenerate={generateMap}
		>
			<Row>
				<Col>
					<SelectInput
						legend="Locations:"
						options={groupingVariables}
						clearable
					/>
				</Col>
				<Col>
					<SelectInput
						legend="Location encoding"
						options={LOCATION_MODES}
						defaultValue="country names"
					/>
				</Col>
			</Row>
			<Row>
				<Col>
					<SelectInput
						legend="Scope:"
						defaultValue="world"
						options={SCOPES}
					/>
				</Col>
				<Col>
					<CheckboxInput
						legend="Show Land"
						defaultValue={false}
						style={{ marginTop: 35 }}
					/>
				</Col>
			</Row>
			<h4 className="center">or</h4>
			<Row>
				<Col>
					<SelectInput
						legend="Longitude:"
						options={variables}
						clearable
					/>
				</Col>
				<Col>
					<SelectInput
						legend="Latitude:"
						options={variables}
						clearable
					/>
				</Col>
			</Row>
			<hr />
			<SelectInput
				legend={t('variable')}
				options={variables}
				clearable
			/>
		</Dashboard>
	);
};


// PROPERTIES //

MapMenu.defaultProps = {
	groupingVariables: null,
	logAction() {},
	onCreated() {}
};

MapMenu.propTypes = {
	data: PropTypes.object.isRequired,
	groupingVariables: PropTypes.array,
	logAction: PropTypes.func,
	onCreated: PropTypes.func,
	session: PropTypes.object.isRequired,
	variables: PropTypes.array.isRequired
};


// EXPORTS //

export default MapMenu;
