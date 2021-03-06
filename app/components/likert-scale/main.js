// MODULES //

import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/FormGroup';
import indexOf from '@stdlib/utils/index-of';
import generateUID from 'utils/uid';
import SessionContext from 'session/context.js';
import ResponseVisualizer from 'components/internal/response-visualizer';
import { LIKERT_SCALE_SUBMISSION } from 'constants/actions.js';


// VARIABLES //

const uid = generateUID( 'likert-scale' );


// MAIN //

/**
* A component showing a question and a five-point scale for students to answer.
*
* @property {(string|node)} question - question to be printed
* @property {Array} options - an array of five elements holding the labels for the different scale levels
* @property {boolean} noMultipleResponses - disallow multiple submissions from a single student
* @property {boolean} disableSubmitNotification - controls whether to disable submission notifications
* @property {string} className - class name
* @property {Object} style - CSS inline styles
*/
const LikertScale = ( props ) => {
	const id = props.id || uid( props );
	const session = useContext( SessionContext );
	const [ value, setValue ] = useState( null );
	const [ submitted, setSubmitted ] = useState( false );

	const submitHandler = () => {
		if ( !props.disableSubmitNotification ) {
			session.addNotification({
				title: 'Answer submitted.',
				message: 'Your answer was successfully stored',
				level: 'success'
			});
		}
		setSubmitted( true );
		session.log({
			id: id,
			type: LIKERT_SCALE_SUBMISSION,
			value: indexOf( props.options, value )
		});
	};
	const handleChange = ( event ) => {
		setValue( event.target.value );
	};
	const disabled = props.noMultipleResponses && submitted;
	return (
		<Card className={`${props.className} center`} style={{ width: '75%', ...props.style }} >
			<Card.Body>
				<FormGroup className="center" >
					<label>{props.question}</label>
					<br />
					{props.options.map( ( elem, idx ) => {
						return (
							<Form.Check
								type="radio"
								label={elem}
								checked={value === elem}
								value={elem}
								key={idx}
								disabled={disabled}
								inline
								onClick={handleChange}
							/>
						);
					})}
				</FormGroup>
				<br />
				<Button
					className="submit-button"
					variant="primary"
					size="sm"
					disabled={!value || disabled}
					onClick={submitHandler}
					style={{
						marginRight: '5px'
					}}
				>
					{ ( submitted && !props.noMultipleResponses ) ? 'Resubmit' : 'Submit' }
				</Button>
				<ResponseVisualizer
					buttonLabel="Responses"
					id={id}
					data={{
						type: 'factor',
						levels: props.options
					}}
					info={LIKERT_SCALE_SUBMISSION}
				/>
			</Card.Body>
		</Card>
	);
};


// PROPERTIES //

LikertScale.propTypes = {
	question: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]),
	options: PropTypes.array,
	noMultipleResponses: PropTypes.bool,
	disableSubmitNotification: PropTypes.bool,
	className: PropTypes.string,
	style: PropTypes.object
};

LikertScale.defaultProps = {
	question: '',
	options: [
		'Strongly disagree',
		'Disagree',
		'Neither agree nor disagree',
		'Agree',
		'Strongly agree'
	],
	noMultipleResponses: false,
	disableSubmitNotification: false,
	className: '',
	style: {}
};


// EXPORTS //

export default LikertScale;
