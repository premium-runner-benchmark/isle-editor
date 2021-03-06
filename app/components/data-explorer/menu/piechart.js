// MODULES //

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import SelectInput from 'components/input/select';
import randomstring from 'utils/randomstring/alphanumeric';
import PieChart from 'components/plots/piechart';
import { DATA_EXPLORER_SHARE_PIECHART, DATA_EXPLORER_PIECHART } from 'constants/actions.js';
import QuestionButton from './../question_button.js';


// VARIABLES //

const MODES = [
	'Counts of unique values',
	'Values from a second variable'
];


// MAIN //

const PieChartMenu = ( props ) => {
	const { variables, defaultValue, groupingVariables, quantitative, t } = props;
	const [ variable, setVariable ] = useState( defaultValue || variables[ 0 ] );
	const [ summaryVariable, setSummaryVariable ] = useState( quantitative[ 0 ] );
	const [ group, setGroup ] = useState( null );
	const [ mode, setMode ] = useState( MODES[ 0 ] );

	const handleGenerate = () => {
		const plotId = randomstring( 6 );
		const action = {
			variable, group, plotId
		};
		if ( mode === MODES[ 1 ] ) {
			action.summaryVariable = summaryVariable;
		}
		const onShare = () => {
			props.session.addNotification({
				title: t('plot-shared'),
				message: t('plot-shared-message'),
				level: 'success',
				position: 'tr'
			});
			props.logAction( DATA_EXPLORER_SHARE_PIECHART, action );
		};
		const output= <PieChart
			id={plotId}
			{...props}
			variable={variable}
			group={group}
			summaryVariable={mode === MODES[ 1 ] ? summaryVariable : null}
			action={action}
			onShare={onShare}
		/>;
		props.logAction( DATA_EXPLORER_PIECHART, action );
		props.onCreated( output );
	};
	return (
		<Card>
			<Card.Header as="h4">
				{t('Pie Chart')}
				<QuestionButton title={t('Pie Chart')} content={t('Pie Chart-description')} />
			</Card.Header>
			<Card.Body>
				<SelectInput
					legend={t('pie-sizes-represent')}
					defaultValue={mode}
					options={MODES}
					onChange={setMode}
				/>
				<SelectInput
					legend={t('variable')}
					defaultValue={variable}
					options={variables}
					onChange={setVariable}
				/>
				{ mode === MODES[ 1 ] ?
					<SelectInput
						legend="Set slice sizes to sum of summary variable:"
						defaultValue={summaryVariable}
						options={quantitative}
						onChange={setSummaryVariable}
					/> : null }
				<SelectInput
					legend={t('group-by')}
					defaultValue={group}
					options={groupingVariables}
					clearable={true}
					menuPlacement="top"
					onChange={setGroup}
				/>
				<Button
					variant="primary" block
					onClick={handleGenerate}
				>{t('generate')}</Button>
			</Card.Body>
		</Card>
	);
};


// PROPERTIES //

PieChartMenu.defaultProps = {
	defaultValue: null,
	groupingVariables: null,
	logAction() {}
};

PieChartMenu.propTypes = {
	data: PropTypes.object.isRequired,
	defaultValue: PropTypes.string,
	groupingVariables: PropTypes.array,
	logAction: PropTypes.func,
	onCreated: PropTypes.func.isRequired,
	session: PropTypes.object.isRequired,
	quantitative: PropTypes.array.isRequired,
	variables: PropTypes.array.isRequired
};


// EXPORTS //

export default PieChartMenu;
