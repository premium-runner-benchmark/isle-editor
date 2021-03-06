// MODULES //

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uniq from 'uniq';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import contains from '@stdlib/assert/contains';
import copy from '@stdlib/utils/copy';
import SelectInput from 'components/input/select';
import CheckboxInput from 'components/input/checkbox';
import { DATA_EXPLORER_NAIVE_BAYES } from 'constants/actions.js';
import NaiveBayes from 'components/models/naive-bayes';
import { designMatrix } from 'components/models/naive-bayes/design_matrix.js';
import QuestionButton from './../question_button.js';


// MAIN //

const NaiveBayesMenu = ( props ) => {
	const [ y, setY ] = useState( props.categorical[ 0 ] );
	const [ x, setX ] = useState( props.quantitative[ 0 ] );
	const [ omitMissing, setOmitMissing ] = useState( false );

	const { categorical, quantitative, t } = props;
	const compute = () => {
		const output = <NaiveBayes
			x={x} y={y}
			omitMissing={omitMissing}
			data={props.data}
			quantitative={props.quantitative}
			categorical={props.categorical}
			onPredict={( results, counter ) => {
				const newData = copy( props.data, 1 );
				const newQuantitative = props.quantitative.slice();
				const { matrix } = designMatrix( x, y, props.data, props.quantitative );
				const probs = results.predictProbs( matrix );
				for ( let i = 0; i < results.classes.length; i++ ) {
					const name = 'probs_' + results.classes[ i ] + '_bayes' + counter;
					const classProbs = probs.map( x => x[ i ] );
					newData[ name ] = classProbs;
					if ( !contains( newQuantitative, name ) ) {
						newQuantitative.push( name );
					}
				}
				const pred = results.predict( matrix );
				const name = 'pred_bayes'+ counter;
				newData[ name ] = pred;
				const newCategorical = props.categorical.slice();
				if ( !contains( newCategorical, name ) ) {
					newCategorical.push( name );
				}
				props.onGenerate( newQuantitative, newCategorical, newData );
			}}
		/>;
		props.logAction( DATA_EXPLORER_NAIVE_BAYES, {
			y, x, omitMissing
		});
		props.onCreated( output );
	};
	return (
		<Card
			style={{ fontSize: '14px' }}
		>
			<Card.Header as="h4">
				{t('Naive Bayes')}
				<QuestionButton title={t('Naive Bayes')} content={t('Naive Bayes-description')} />
			</Card.Header>
			<Card.Body>
				<SelectInput
					legend={t('outcome-y')}
					options={categorical}
					defaultValue={y}
					onChange={setY}
				/>
				<SelectInput
					legend={t('predictors-x')} multi
					options={uniq( quantitative.concat( categorical ) )}
					defaultValue={x || ''}
					onChange={setX}
				/>
				<CheckboxInput
					legend={t('omit-missing')}
					defaultValue={false}
					onChange={setOmitMissing}
				/>
				<Button disabled={!x || x.length === 0} variant="primary" block onClick={compute} >
					{t('calculate')}
				</Button>
			</Card.Body>
		</Card>
	);
};


// PROPERTIES //

NaiveBayesMenu.defaultProps = {
	logAction() {}
};

NaiveBayesMenu.propTypes = {
	categorical: PropTypes.array.isRequired,
	quantitative: PropTypes.array.isRequired,
	data: PropTypes.object.isRequired,
	logAction: PropTypes.func,
	onGenerate: PropTypes.func.isRequired,
	onCreated: PropTypes.func.isRequired
};


// EXPORTS //

export default NaiveBayesMenu;
