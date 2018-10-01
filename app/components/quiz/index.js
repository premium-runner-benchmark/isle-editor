// MODULES //

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Card from 'react-bootstrap/lib/Card';
import logger from 'debug';
import sample from '@stdlib/random/sample';
import isArray from '@stdlib/assert/is-array';
import isObject from '@stdlib/assert/is-plain-object';
import isInteger from '@stdlib/assert/is-integer';
import incrspace from '@stdlib/math/utils/incrspace';
import Timer from 'components/timer';
import FreeTextQuestion from 'components/free-text-question';
import MultipleChoiceQuestion from 'components/multiple-choice-question';
import MatchListQuestion from 'components/match-list-question';
import NumberQuestion from 'components/number-question';
import OrderQuestion from 'components/order-question';
import RangeQuestion from 'components/range-question';
import SelectQuestion from 'components/select-question';
import convertJSONtoJSX from 'utils/json-to-jsx';
import './quiz.css';


// VARIABLES //

const debug = logger( 'isle:quiz' );


// FUNCTIONS //

function isHTMLConfig( elem ) {
	return (
		isObject( elem ) &&
		elem.component
	);
}


// MAIN //

/**
* A quiz component displaying a sequence of question components.
*
* @property {Array} questions - array of questions from which questions will be randomly selected
* @property {number} count - number of questions to include in the quiz
* @property {boolean} confidence - whether to display a Likert scale asking for the confidence of the user's answer
* @property {boolean} forceConfidence - controls whether a user has to supply a confidence level before moving to the next question
* @property {boolean} skippable - controls whether questions in  the quiz are skippable
* @property {Function} onFinished - callback invoked when the quiz is finished and the results page is displayed
*/
class Quiz extends Component {
	constructor( props ) {
		super( props );

		const indices = incrspace( 0, props.questions.length, 1 );
		this.sample = sample.factory( indices, {
			size: 1,
			mutate: true,
			replace: false
		});
		this.state = {
			answers: new Array( props.questions.length ),
			answered: false,
			confidences: new Array( props.questions.length ),
			current: this.sample()[ 0 ],
			counter: 0,
			finished: false,
			last: false,
			selectedConfidence: null
		};
	}

	componentDidUpdate( prevProps ) {
		if (
			this.props.count !== prevProps.count ||
			this.props.questions.length !== prevProps.questions.length
		) {
			debug( 'Resetting component...' );
			const indices = incrspace( 0, this.props.questions.length, 1 );
			this.sample = sample.factory( indices, {
				size: 1,
				mutate: true
			});
		}
	}

	handleNextClick = () => {
		debug( 'Display next question...' );
		const elem = this.props.questions[ this.state.current ];

		// Save chosen confidence level:
		if ( elem.props && elem.props.id && this.state.selectedConfidence ) {
			const session = this.context.session;
			session.log({
				id: elem.props.id+'_confidence',
				type: 'QUESTION_CONFIDENCE',
				value: this.state.selectedConfidence
			});
		}
		const newState = {};
		let counter = this.state.counter;
		counter += 1;
		if ( counter >= this.props.count ) {
			debug( 'No further questions should be shown...' );
			newState.finished = true;
			this.props.onFinished();
		} else {
			if ( counter === this.props.count-1 ) {
				newState.last = true;
			}
			newState.current = this.sample()[ 0 ];
			debug( 'Selected question at index '+newState.current );
		}
		if ( !this.state.answered ) {
			const answers = this.state.answers.slice();
			if ( elem.props ) {
				let solution;
				if ( elem.component === 'MultipleChoiceQuestion' ) {
					const correct = elem.props.solution;
					if ( isArray( correct ) ) {
						solution = '';
						for ( let i = 0; i < correct.length; i++ ) {
							solution += elem.props.answers[ correct[ i ] ];
							solution += '; ';
						}
					} else if ( isInteger( correct ) ) {
						solution = elem.props.answers[ correct ].content;
					}
				}
				else if ( elem.component === 'MatchListQuestion' ) {
					solution = '';
					for ( let i = 0; i < elem.props.elements.length; i++ ) {
						const val = elem.props.elements[ i ];
						solution += `${val.a}:${val.b}; `;
					}
				}
				else {
					solution = elem.props.solution;
				}
				answers[ this.state.current ] = {
					question: elem.props ? elem.props.question : null,
					answer: null,
					counter,
					solution
				};
				newState.answers = answers;
			}
		}
		newState.answered = false;
		newState.selectedConfidence = null;
		newState.counter = counter;
		this.setState( newState);
	}

	handleSubmission = ( val ) => {
		const elem = this.props.questions[ this.state.current ];
		const answers = this.state.answers.slice();

		let answer;
		let solution;
		if ( elem.props ) {
			if ( elem.component === 'MultipleChoiceQuestion' ) {
				answer = elem.props.answers[ val ].content;
				const correct = elem.props.solution;
				if ( isArray( correct ) ) {
					solution = '';
					for ( let i = 0; i < correct.length; i++ ) {
						solution += elem.props.answers[ correct[ i ] ];
						solution += '; ';
					}
				} else {
					solution = elem.props.answers[ correct ].content;
				}
			}
			else if ( elem.component === 'MatchListQuestion' ) {
				answer = '';
				solution = '';
				for ( let i = 0; i < elem.props.elements.length; i++ ) {
					const e = elem.props.elements[ i ];
					const userElem = val[ i ];
					solution += `${e.a}:${e.b}; `;
					answer += `${userElem.a}:${userElem.b}; `;
				}
			}
			else {
				answer = val;
				solution = elem.props.solution;
			}
			answers[ this.state.current ] = {
				question: elem.props ? elem.props.question : null,
				answer,
				solution,
				counter: this.state.counter
			};
		}
		this.setState({
			answered: true,
			answers: answers
		});
	}

	renderScoreboard() {
		debug( 'Rendering scoreboard...' );
		const answers = this.state.answers.slice();
		for ( let i = 0; i < this.state.answers.length; i++ ) {
			if ( answers[ i ] ) {
				answers[ i ].confidence = this.state.confidences[ i ];
			}
		}
		answers.sort( ( a, b ) => a.counter > b.counter );
		return ( <div>
			<p>{ this.props.duration ? 'Your time is up. ' : 'You have finished the quiz. ' } Here is a summary of your answers:</p>
			<table className="table table-bordered" >
				<thead>
					<tr>
						<th>Question</th>
						<th>Your answer</th>
						<th>Solution</th>
						{ this.props.confidence ? <th>Your Confidence</th> : null }
					</tr>
				</thead>
				<tbody>
					{answers.map( ( elem, idx ) => {
						let className;
						if ( elem.answer === elem.solution ) {
							className = 'quiz-right-answer';
						} else {
							className = 'quiz-wrong-answer';
						}
						let question = elem.question;
						if ( isHTMLConfig( question ) ) {
							question = convertJSONtoJSX( question );
						}
						let answer = elem.answer;
						if ( isHTMLConfig( answer ) ) {
							answer = convertJSONtoJSX( answer );
						}
						let solution = elem.solution;
						if ( isHTMLConfig( solution ) ) {
							solution = convertJSONtoJSX( solution );
						}
						return ( <tr className={className} key={idx}>
							<td>{question}</td>
							<td>{answer}</td>
							<td>{solution}</td>
							{ this.props.confidence ?
								<td>{elem.confidence}</td> :
								null
							}
						</tr> );
					})}
				</tbody>
			</table>
		</div> );
	}

	renderCurrentQuestion() {
		const config = this.props.questions[ this.state.current ];
		let props = config.props || {};
		if ( isHTMLConfig( props.question ) ) {
			debug( 'Question property is an object, convert to JSX...' );
			props.question = convertJSONtoJSX( props.question );
		}
		switch ( config.component ) {
			case 'Fragment':
				return convertJSONtoJSX( config );
			case 'FreeTextQuestion':
				return <FreeTextQuestion provideFeedback={false} {...props} onSubmit={this.handleSubmission} />;
			case 'MultipleChoiceQuestion':
				return <MultipleChoiceQuestion provideFeedback={false} {...props} onSubmit={this.handleSubmission} />;
			case 'MatchListQuestion':
				return <MatchListQuestion showSolution={false} {...props} onSubmit={this.handleSubmission} />;
			case 'NumberQuestion':
				return <NumberQuestion provideFeedback={false} {...props} onSubmit={this.handleSubmission} />;
			case 'OrderQuestion':
				return <OrderQuestion provideFeedback={false} {...props} onSubmit={this.handleSubmission} />;
			case 'RangeQuestion':
				return <RangeQuestion provideFeedback={false} {...props} onSubmit={this.handleSubmission} />;
			case 'SelectQuestion':
				return <SelectQuestion provideFeedback={false} {...props} onSubmit={this.handleSubmission} />;
		}
	}

	handleConfidenceChange = ( event ) => {
		const confidence = event.target.value;
		debug( 'Choosing confidence: '+confidence );
		const confidences = this.state.confidences.slice();
		confidences[ this.state.current ] = confidence;
		this.setState({
			selectedConfidence: confidence,
			confidences: confidences
		});
	}

	renderConfidenceSurvey() {
		if ( !this.props.confidence ) {
			return null;
		}
		return (
			<Card className="center" style={{ width: '75%' }}>
				<FormGroup className="center" >
					<label>Please indicate how confident you are in your answer(s):</label>
					<br />
					<Form.Check
						type="radio"
						label="Guessed"
						checked={this.state.selectedConfidence === 'Guessed'}
						value="Guessed"
						inline
						onClick={this.handleConfidenceChange}
					/>
					{' '}
					<Form.Check
						type="radio"
						label="Somewhat sure"
						checked={this.state.selectedConfidence === 'Somewhat sure'}
						value="Somewhat sure"
						inline
						onClick={this.handleConfidenceChange}
					/>
					{' '}
					<Form.Check
						type="radio"
						label="Confident"
						checked={this.state.selectedConfidence === 'Confident'}
						value="Confident"
						inline
						onClick={this.handleConfidenceChange}
					/>
				</FormGroup>
			</Card>
		);
	}

	render() {
		let showButton;
		if ( this.state.finished ) {
			showButton = false;
		} else {
			showButton = this.state.answered || this.props.skippable;
		}
		return (
			<Fragment>
				{this.props.duration ?
					<Timer
						invisible
						id={this.props.id}
						active={this.props.active}
						duration={this.props.duration}
						onTimeUp={() => {
							debug( 'Time is up...' );
							this.setState({
								finished: true
							}, () => {
								this.props.onFinished();
							});
						}}
					/> :
					null
				}
				<Card>
					<Card.Header>
						{ this.state.finished ?
							<span>Answer Summary</span> :
							<span>Question {this.state.counter+1}/{this.props.count}</span>
						}
					</Card.Header>
					<Card.Body>
						{ this.state.finished ?
							this.renderScoreboard() :
							<span key={this.state.current}>{this.renderCurrentQuestion()}</span>
						}
						{ showButton ?
							<Button
								className="quiz-button"
								onClick={this.handleNextClick}
								disabled={this.props.forceConfidence && this.state.answered && !this.state.selectedConfidence}
							>
								{this.state.last ? 'Finish Quiz' : 'Next Question' }
							</Button> :
							null
						}
						{ !this.state.finished ? this.renderConfidenceSurvey() : null }
					</Card.Body>
				</Card>
			</Fragment>
		);
	}
}


// TYPES //

Quiz.propTypes = {
	confidence: PropTypes.bool,
	forceConfidence: PropTypes.bool,
	count: PropTypes.number.isRequired,
	questions: PropTypes.array.isRequired,
	active: PropTypes.bool,
	duration: PropTypes.number,
	skippable: PropTypes.bool,
	onFinished: PropTypes.func
};

Quiz.defaultProps = {
	confidence: false,
	forceConfidence: false,
	active: true,
	duration: null,
	skippable: true,
	onFinished() {}
};

Quiz.contextTypes = {
	session: PropTypes.object
};


// EXPORTS //

export default Quiz;
