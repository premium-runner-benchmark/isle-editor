// MODULES //

import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import logger from 'debug';
import PINF from '@stdlib/constants/math/float64-pinf';
import NINF from '@stdlib/constants/math/float64-ninf';
import minimum from '@stdlib/math/base/special/min';
import maximum from '@stdlib/math/base/special/max';
import roundn from '@stdlib/math/base/special/roundn';
import isnan from '@stdlib/assert/is-nan';
import isUndefinedOrNull from '@stdlib/assert/is-undefined-or-null';
import generateUID from 'utils/uid';
import ChatButton from 'components/chat-button';
import TimedButton from 'components/timed-button';
import ResponseVisualizer from 'components/internal/response-visualizer';
import NumberInput from 'components/input/number';
import HintButton from 'components/hint-button';
import FeedbackButtons from 'components/feedback';
import GradeFeedbackRenderer from 'components/internal/grade-feedback-renderer';
import SessionContext from 'session/context.js';
import { RANGE_QUESTION_SUBMIT_ANSWER, RANGE_QUESTION_OPEN_HINT } from 'constants/actions.js';
import './load_translations.js';
import './range-question.css';


// VARIABLES //

const debug = logger( 'isle:range-question' );
const uid = generateUID( 'range-question' );


// MAIN //

/**
* A range question component that asks students to supply a lower and upper end point.
*
* @property {(string|node)} question - displayed question
* @property {Array<number>} solution - two-element array containing the endpoints of the correct range
* @property {Array<string>} hints - hints providing guidance on how to answer the question
* @property {string} hintPlacement - placement of the hints (either `top`, `left`, `right`, or `bottom`)
* @property {boolean} feedback - controls whether to display feedback buttons
* @property {boolean} chat - controls whether the element should have an integrated chat
* @property {number} digits - number of digits that have to match between solution and user-supplied answer. If not given or set to null, the component checks for strict equality. If set to 0, checks for integer equality
* @property {number} max - maximum input value
* @property {number} min - minimum input value
* @property {boolean} provideFeedback - indicates whether feedback including the correct answer should be displayed after learners submit their answers
* @property {boolean} allowMultipleAnswers - controls whether one can submit multiple answers
* @property {Date} until - time until students should be allowed to submit answers
* @property {number} points - maximum number of points awarded in grading
* @property {Object} style - CSS inline styles
* @property {Function} onChangeUpper - callback triggered after the upper bound is changed by the user
* @property {Function} onChangeLower - callback triggered after the lower bound is changed by the user
* @property {Function} onSubmit - callback invoked when answer is submitted; has as first parameter a `boolean` indicating whether the answer was correctly answered (if applicable, `null` otherwise) and the supplied answer as the second parameter
 */
const RangeQuestion = ( props ) => {
	const id = props.id || uid( props );
	const { min, max, points, question, solution, t, until, feedback, style,
		provideFeedback, allowMultipleAnswers, hints, chat } = props;
	const session = useContext( SessionContext );

	const [ lower, setLower ] = useState( min );
	const [ upper, setUpper ] = useState( max );
	const [ submitted, setSubmitted ] = useState( false );
	const [ correct, setCorrect ] = useState( false );

	const handleChangeUpper = ( newValue ) => {
		setUpper( newValue );
		props.onChangeUpper( maximum( newValue, lower ) );
	};
	const handleChangeLower = ( newValue ) => {
		setLower( newValue );
		props.onChangeLower( minimum( newValue, upper ) );
	};
	const handleBlurUpper = ( value ) => {
		if ( value <= lower ) {
			setUpper( lower );
		}
	};
	const handleBlurLower = ( value ) => {
		if ( value >= upper ) {
			setLower( upper );
		}
	};
	const logHint = ( idx ) => {
		debug( 'Logging hint...' );
		session.log({
			id: id,
			type: RANGE_QUESTION_OPEN_HINT,
			value: idx
		});
	};
	const submitHandler = () => {
		const { digits, solution } = props;
		let correct;
		const lowerVal = parseFloat( lower );
		const upperVal = parseFloat( upper );
		if ( !isUndefinedOrNull( solution ) ) {
			if ( digits === null ) {
				correct = ( lowerVal === solution[0] && upperVal === solution[1] );
			} else {
				correct = ( roundn( lowerVal, -digits ) === roundn( solution[0], -digits ) &&
					(roundn(upperVal, -digits) === roundn(solution[1], -digits)) );
			}
			props.onSubmit( [ lowerVal, upperVal ], correct );
			if ( provideFeedback ) {
				session.addNotification({
					title: t('answer-submitted'),
					message: correct ? t('submission-correct') : t('submission-incorrect'),
					level: correct ? 'success' : 'error'
				});
			} else {
				session.addNotification({
					title: submitted ? t('answer-resubmitted') : t('answer-submitted'),
					message: submitted ?
						t('resubmission-message') :
						t('submission-message'),
					level: 'info'
				});
			}
		} else {
			props.onSubmit( [ lowerVal, upperVal ] );
			session.addNotification({
				title: submitted ? t('answer-resubmitted') : t('answer-submitted'),
				message: submitted ?
					t('resubmission-message') :
					t('submission-message'),
				level: 'success'
			});
		}
		setSubmitted( true );
		setCorrect( correct );
		session.log({
			id: id,
			type: RANGE_QUESTION_SUBMIT_ANSWER,
			value: JSON.stringify( [ lower, upper ] )
		});
	};
	const handleKeyPress = ( event ) => {
		if ( event.charCode === 13 ) {
			// Manually trigger blur event since not happening when pressing ENTER:
			if ( document && document.activeElement ) {
				debug( 'Trigger blur event...' );
				document.activeElement.blur();
			}
			setTimeout( submitHandler, 50 );
		}
	};
	useEffect(() => {
		if ( !isnan( solution[ 1 ] ) && !isnan( solution[ 0 ] ) ) {
			setLower( min );
			setUpper( max );
			setSubmitted( false );
			setCorrect( false );
		}
	}, [ question, solution, min, max ]);
	const renderSubmitButton = () => {
		if ( until && session.startTime > until ) {
			return <span className="title" style={{ marginLeft: 4 }} >{t('question-closed')}</span>;
		}
		return (
			<TimedButton
				className="submit-button"
				variant="primary"
				size="sm"
				disabled={submitted && !allowMultipleAnswers}
				onClick={submitHandler}
			>
				{ submitted && allowMultipleAnswers ? t('resubmit') : t('submit') }
			</TimedButton>
		);
	};
	const nHints = hints.length;
	const solutionPresent = solution !== null;
	return (
		<Card id={id} className="range-question" style={style} >
			<Card.Body style={{ width: feedback ? 'calc(100%-60px)' : '100%', display: 'inline-block' }}>
				{ question ? <label>{question}</label> : null }
				<div className="range-question-input-wrapper" >
					<NumberInput
						step="any"
						legend={t('lower')}
						onChange={handleChangeLower}
						defaultValue={lower}
						disabled={submitted && !allowMultipleAnswers}
						inline
						width={90}
						min={min}
						max={max}
						numbersOnly={false}
						onBlur={handleBlurLower}
						onKeyPress={handleKeyPress}
					/>
					<NumberInput
						step="any"
						legend={t('upper')}
						onChange={handleChangeUpper}
						defaultValue={upper}
						disabled={submitted && !allowMultipleAnswers}
						inline
						width={90}
						min={min}
						max={max}
						numbersOnly={false}
						onBlur={handleBlurUpper}
						onKeyPress={handleKeyPress}
					/>
					{ submitted && solutionPresent && provideFeedback ?
						<Badge variant={correct ? 'success' : 'danger'} style={{ fontSize: 18 }}>
							{`${t('solution')}:   `}
							{solution[0]}, {solution[1]}
						</Badge> :
						null
					}
				</div>
				<ButtonToolbar className="range-question-toolbar" >
					<ResponseVisualizer
						buttonLabel={t('answers')}
						id={id}
						data={{
							type: 'range',
							question: question,
							solution: solution
						}}
						info={RANGE_QUESTION_SUBMIT_ANSWER}
						style={{ marginLeft: '3px', marginRight: '3px' }}
						points={points}
					/>
					{ nHints > 0 ?
						<HintButton onClick={logHint} hints={hints} placement={props.hintPlacement} /> :
						null
					}
					{ chat ? <div style={{ display: 'inline-block', marginLeft: '4px' }}>
						<ChatButton for={id} />
					</div> : null }
					{renderSubmitButton()}
				</ButtonToolbar>
				{ feedback ? <FeedbackButtons
					id={id+'_feedback'}
					style={{ marginRight: 5, marginTop: -5 }}
				/> : null }
				<GradeFeedbackRenderer for={id} points={points} />
			</Card.Body>
		</Card>
	);
};


// PROPERTIES //

RangeQuestion.defaultProps = {
	question: '',
	solution: null,
	hints: [],
	hintPlacement: 'top',
	feedback: true,
	chat: false,
	digits: 3,
	max: PINF,
	min: NINF,
	provideFeedback: true,
	allowMultipleAnswers: false,
	until: null,
	points: 10,
	style: {},
	onChangeUpper() {},
	onChangeLower() {},
	onSubmit() {}
};

RangeQuestion.propTypes = {
	question: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]),
	solution: PropTypes.arrayOf( PropTypes.number ),
	hintPlacement: PropTypes.string,
	hints: PropTypes.arrayOf(
		PropTypes.oneOfType([ PropTypes.string, PropTypes.node ])
	),
	feedback: PropTypes.bool,
	chat: PropTypes.bool,
	digits: PropTypes.number,
	max: PropTypes.number,
	min: PropTypes.number,
	provideFeedback: PropTypes.bool,
	allowMultipleAnswers: PropTypes.bool,
	until: PropTypes.instanceOf( Date ),
	points: PropTypes.number,
	style: PropTypes.object,
	onChangeLower: PropTypes.func,
	onChangeUpper: PropTypes.func,
	onSubmit: PropTypes.func
};


// EXPORTS //

export default withTranslation( 'range-question' )( RangeQuestion );
