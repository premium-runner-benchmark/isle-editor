// MODULES //

import React from 'react';
import PropTypes from 'prop-types';
import CheckboxInput from 'components/input/checkbox';
import SelectInput from 'components/input/select';
import Dashboard from 'components/dashboard';
import randomstring from 'utils/randomstring/alphanumeric';
import MosaicPlot from 'components/plots/mosaicplot';
import { DATA_EXPLORER_SHARE_MOSAIC, DATA_EXPLORER_MOSAIC } from 'constants/actions.js';
import QuestionButton from './../question_button.js';


// VARIABLES //

const AXIS_OPTIONS = [
	'parallel to the axis',
	'horizontal',
	'perpendicular to the axis',
	'vertical'
];


// MAIN //

const MosaicPlotMenu = ({ data, variables, session, t, logAction, onCreated, onPlotDone }) => {
	const generateMosaicPlot = ( variables, showColors, axisLabels ) => {
		if ( !variables || variables.length < 2 ) {
			return session.addNotification({
				title: 'Select Variables',
				message: 'You need to select at least two variables for the mosaic plot',
				level: 'warning',
				position: 'tr'
			});
		}
		const plotId = randomstring( 6 );
		const action = {
			variables, showColors, plotId
		};
		const onShare = () => {
			session.addNotification({
				title: t('plot-shared'),
				message: t('plot-shared-message'),
				level: 'success',
				position: 'tr'
			});
			logAction( DATA_EXPLORER_SHARE_MOSAIC, {
				variables, showColors, plotId
			});
		};
		const output = <MosaicPlot
			data={data}
			variables={variables}
			showColors={showColors}
			axisLabels={axisLabels}
			id={plotId}
			action={action}
			onShare={onShare}
			onPlotDone={onPlotDone}
		/>;
		logAction( DATA_EXPLORER_MOSAIC, action );
		onCreated( output );
	};
	return (
		<Dashboard
			autoStart={false}
			title={<span>
				{t('Mosaic Plot')}
				<QuestionButton title={t('Mosaic Plot')} content={t('Mosaic Plot-description')} />
			</span>}
			onGenerate={generateMosaicPlot}
			style={{ minHeight: 380 }}
		>
			<SelectInput
				legend={t('variables')}
				options={variables}
				multi
			/>
			<CheckboxInput
				legend={t('show-colors')}
				defaultValue={false}
			/>
			<SelectInput
				legend="Axis Label Rotation"
				options={AXIS_OPTIONS}
			/>
		</Dashboard>
	);
};


// PROPERTIES //

MosaicPlotMenu.defaultProps = {
	logAction() {},
	onPlotDone() {}
};

MosaicPlotMenu.propTypes = {
	data: PropTypes.object.isRequired,
	logAction: PropTypes.func,
	onCreated: PropTypes.func.isRequired,
	onPlotDone: PropTypes.func,
	session: PropTypes.object.isRequired,
	variables: PropTypes.array.isRequired
};


// EXPORTS //

export default MosaicPlotMenu;
