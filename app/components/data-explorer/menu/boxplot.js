// MODULES //

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import SelectInput from 'components/input/select';
import selectStyles from 'components/input/select/styles';
import CheckboxInput from 'components/input/checkbox';
import randomstring from 'utils/randomstring/alphanumeric';
import BoxPlot from 'components/plots/boxplot';
import { DATA_EXPLORER_SHARE_BOXPLOT, DATA_EXPLORER_BOXPLOT } from 'constants/actions.js';
import QuestionButton from '../question_button.js';


// MAIN //

const BoxplotMenu = ({ data, variables, defaultValue, groupingVariables, t, session, logAction, onCreated }) => {
	const [ variable, setVariable ] = useState( defaultValue || variables[ 0 ] );
	const [ group, setGroup ] = useState([]);
	const [ orientation, setOrientation ] = useState( 'vertical' );
	const [ overlayPoints, setOverlayPoints ] = useState( false );

	const generateBoxplot = () => {
		const groupValues = ( group || [] ).map( e => e.value );
		const plotId = randomstring( 6 );
		const action = {
			variable,
			group: groupValues,
			plotId
		};
		const onShare = () => {
			session.addNotification({
				title: t('plot-shared'),
				message: t('plot-shared-message'),
				level: 'success',
				position: 'tr'
			});
			logAction( DATA_EXPLORER_SHARE_BOXPLOT, action );
		};
		const output = <BoxPlot id={plotId} onShare={onShare} action={action}
			data={data} variable={variable} group={groupValues} orientation={orientation}
			overlayPoints={overlayPoints} variables={variables}
		/>;
		logAction( DATA_EXPLORER_BOXPLOT, action );
		onCreated( output );
	};
	return (
		<Card>
			<Card.Header as="h4">
				{t('Box Plot')}
				<QuestionButton title={t('Box Plot')} content={t('Box Plot-description')} />
			</Card.Header>
			<Card.Body>
				<SelectInput
					legend={t('variable')}
					defaultValue={variable}
					options={variables}
					onChange={setVariable}
				/>
				<FormGroup controlId="boxplot-form-select">
					<FormLabel>{t('group-by')}:</FormLabel>
					<Select
						value={group}
						options={groupingVariables.map( e => ( { 'label': e, 'value': e } ))}
						isClearable
						isMulti
						onChange={( value ) => {
							if ( !value || value.length <= 2 ) {
								setGroup( value );
							}
						}}
						styles={selectStyles}
						menuPortalTarget={document.body}
					/>
				</FormGroup>
				<SelectInput
					legend={t('orientation')}
					options={[ 'vertical', 'horizontal' ]}
					defaultValue="vertical"
					menuPlacement="top"
					onChange={setOrientation}
				/>
				<CheckboxInput
					legend={t('overlay-points')}
					defaultValue={false}
					onChange={setOverlayPoints}
				/>
				<Button variant="primary" block onClick={generateBoxplot}>
					{t('generate')}
				</Button>
			</Card.Body>
		</Card>
	);
};


// PROPERTIES //

BoxplotMenu.defaultProps = {
	defaultValue: null,
	groupingVariables: null,
	logAction() {},
	onCreated() {}
};

BoxplotMenu.propTypes = {
	data: PropTypes.object.isRequired,
	defaultValue: PropTypes.string,
	groupingVariables: PropTypes.array,
	logAction: PropTypes.func,
	onCreated: PropTypes.func,
	session: PropTypes.object.isRequired,
	variables: PropTypes.array.isRequired
};


// EXPORTS //

export default BoxplotMenu;
