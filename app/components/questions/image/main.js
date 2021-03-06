// MODULES //

import React, { Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import logger from 'debug';
import { withTranslation } from 'react-i18next';
import { toJpeg } from 'html-to-image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import contains from '@stdlib/assert/contains';
import generateUID from 'utils/uid';
import Image from 'components/image';
import Spinner from 'components/internal/spinner';
import ResponseVisualizer from 'components/internal/response-visualizer';
import SolutionButton from 'components/solution-button';
import TimedButton from 'components/timed-button';
import HintButton from 'components/hint-button';
import ChatButton from 'components/chat-button';
import Sketchpad from 'components/sketchpad';
import FeedbackButtons from 'components/feedback';
import GradeFeedbackRenderer from 'components/internal/grade-feedback-renderer';
import SessionContext from 'session/context.js';
import blobToBase64 from 'utils/blob-to-base64';
import stopDefaultAndPropagation from 'utils/stop-default-and-propagation';
import { IMAGE_QUESTION_SUBMISSION, IMAGE_QUESTION_OPEN_HINT } from 'constants/actions.js';
import './load_translations.js';
import './image_question.css';


// VARIABLES //

const uid = generateUID( 'image-question' );
const debug = logger( 'isle:image-question' );
const RE_IMAGE_SRC = /src="([^"]*)"/;


// MAIN //

/**
* A question that asks the user to upload an image.
*
* @property {(string|node)} question - question for which the student has to bring the available `options` into the correct order
* @property {Array} hints - hints providing guidance on how to answer the question
* @property {string} hintPlacement - placement of the hints (either `top`, `left`, `right`, or `bottom`)
* @property {boolean} feedback - controls whether to display feedback buttons
* @property {boolean} chat - controls whether the element should have an integrated chat
* @property {Object} sketchpad - properties to be passed to <Sketchpad /> component; to render the sketchpad, pass in at least an empty object `{}`
* @property {string} solution - image URL of model solution
* @property {Date} until - time until students should be allowed to submit answers
* @property {boolean} disableSubmitNotification - controls whether a notification should be displayed after submitting an image
* @property {number} points - maximum number of points awarded in grading
* @property {string} className - class name
* @property {Object} style - CSS inline styles
* @property {Function} onChange - callback  which is triggered after dragging an element; has two parameters: a `boolean` indicating whether the elements were placed in the correct order and and `array` with the current ordering
* @property {Function} onSubmit - callback invoked when answer is submitted; has as a sole parameter a `boolean` indicating whether the elements were placed in the correct order
*/
const ImageQuestion = ( props ) => {
	const id = props.id || uid( props );
	const session = useContext( SessionContext );
	let fileUpload;

	const [ submitted, setSubmitted ] = useState( false );
	const [ src, setSrc ] = useState( null );
	const [ exhaustedHints, setExhaustedHints ] = useState( props.hints.length === 0 );
	const [ displaySolution, setDisplaySolution ] = useState( false );
	const [ isProcessing, setIsProcessing ] = useState( false );

	const onFileRead = ( event ) => {
		setSrc( event.target.result );
	};

	const nHints = props.hints.length;
	const solutionButton = <SolutionButton
		disabled={!submitted || !exhaustedHints}
		onClick={() => {
			setDisplaySolution( !displaySolution );
		}}
		hasHints={props.hints.length > 0}
	/>;
	const logHint = ( idx ) => {
		debug( 'Logging hint...' );
		session.log({
			id: id,
			type: IMAGE_QUESTION_OPEN_HINT,
			value: idx
		});
	};
	const sendSubmitNotification = () => {
		session.addNotification({
			title: props.t('submitted'),
			message: props.t('answer-submitted'),
			level: 'info'
		});
	};
	const toggleSpinner = () => {
		setIsProcessing( !isProcessing );
	};

	/**
	* Creates FileReader and attaches event listener for when the file is ready.
	*/
	const handleFileUpload = () => {
		const reader = new FileReader();
		const selectedFile = fileUpload.files[ 0 ];
		reader.addEventListener( 'load', onFileRead, false );
		reader.readAsDataURL( selectedFile );
	};
	const handleSubmit = () => {
		if ( !props.disableSubmitNotification ) {
			sendSubmitNotification();
		}
		props.onSubmit();
		setSubmitted( true );
		if ( src ) {
			session.log({
				id: id,
				type: IMAGE_QUESTION_SUBMISSION,
				value: src
			});
		} else {
			const canvas = document.getElementById( id+'-canvas' );
			canvas.toBlob( ( blob ) => {
				blobToBase64( blob ).then( newSrc => {
					session.log({
						id: id,
						type: IMAGE_QUESTION_SUBMISSION,
						value: newSrc
					});
					setSrc( newSrc );
				});
			});
		}
	};

	/**
	* Event handler invoked when user drags file onto the upload area.
	*/
	const onDrop = ( evt ) => {
		evt.stopPropagation();
		evt.preventDefault();
		toggleSpinner();
		const dt = evt.dataTransfer;
		const reader = new FileReader();
		let file = null;
		if ( dt.items && dt.items.length > 0 ) {
			const item = dt.items[ 0 ];
			if ( item.kind === 'file' ) {
				file = item.getAsFile();
			}
			else if ( item.kind === 'string' ) {
				item.getAsString( ( str ) => {
					if ( contains( str, '<img' ) ) {
						const match = str.match( RE_IMAGE_SRC );
						if ( match ) {
							setSrc( match[ 1 ] );
							toggleSpinner();
						}
					} else if ( contains( str, '<thead' ) ) {
						const node = document.createElement( 'table' );
						node.innerHTML = str;
						document.body.appendChild( node );
						toJpeg( node, {
							backgroundColor: 'white',
							style: {
								fontSize: 12
							},
							width: 600
						}).then( data => {
							setSrc( data );
							toggleSpinner();
							node.remove();
						});
					} else {
						const node = document.createElement( 'pre' );
						node.innerHTML = str;
						document.body.appendChild( node );
						toJpeg( node, {
							backgroundColor: 'white',
							style: {
								fontSize: 14
							}
						}).then( data => {
							setSrc( data );
							toggleSpinner();
							node.remove();
						});
					}
				});
			}
		}
		else if ( dt.files && dt.files.length > 0 ) {
			file = dt.files[ 0 ];
		}
		if ( file ) {
			if ( file ) {
				reader.addEventListener( 'load', onFileRead, false );
				reader.readAsDataURL( file );
			}
		}
	};
	const renderSubmitButton = () => {
		if ( props.until && session.startTime > props.until ) {
			return <span className="title" style={{ marginLeft: 4 }} >{props.t('question-closed')}</span>;
		}
		return (
			<TimedButton
				className="submit-button" variant="primary" size="sm" onClick={handleSubmit}
			>
				{ submitted ? props.t('resubmit') : props.t('submit') }
			</TimedButton>
		);
	};
	let content;
	if ( !isProcessing ) {
		content = src ?
		<div className="center" style={{ maxWidth: 600 }}>
			{displaySolution ?
				<Image
					alt={props.t('model-solution')}
					src={props.solution}
					width="100%" height="auto"
					style={{
						border: 'solid 1px gold'
					}}
				/> : <Image
					alt={props.t('upload')}
					src={src}
					width="100%" height="auto"
				/>
			}
		</div>:
		<Fragment>
			<div
				className="image-question-dropzone"
				onDrop={onDrop}
				onDragOver={stopDefaultAndPropagation}
				onDragEnd={stopDefaultAndPropagation}
			>
				<span>{props.t('drop-image')}</span>
			</div>
			<p className="center">{props.t('or')}</p>
			<input
				id={id+'-upload'}
				className="image-question-upload center"
				type="file"
				accept="image/*"
				onChange={handleFileUpload}
				ref={input => {
					fileUpload = input;
				}}
			/>
			{props.sketchpad ?
			<Fragment>
				<p className="center">{props.t('or')}</p>
				<Sketchpad
					id={id}
					hideNavigationButtons hideSaveButtons hideTransmitButtons
					canvasWidth={900}
					canvasHeight={600}
					{...props.sketchpad}
				/>
			</Fragment> : null}
		</Fragment>;
	}
	return (
		<Card id={id} className={`image-question ${props.className}`} style={props.style} >
			<Card.Body style={{ width: props.feedback ? 'calc(100%-60px)' : '100%', display: 'inline-block' }} >
				<label>{props.question}</label>
				<Spinner running={isProcessing} width={256} height={128} />
				{content}
				{ props.feedback ? <FeedbackButtons vertical
					id={id+'_feedback'}
					style={{
						position: 'absolute',
						right: '4px',
						top: '4px'
					}}
				/> : null }
				<ResponseVisualizer
					buttonLabel="Answers" id={id}
					info={IMAGE_QUESTION_SUBMISSION}
					data={{
						question: props.question,
						type: 'image'
					}}
					points={props.points}
				/>
				<div className="image-question-toolbar">
					{ nHints > 0 ?
						<HintButton
							onClick={logHint}
							hints={props.hints}
							placement={props.hintPlacement}
							onFinished={() => {
								setExhaustedHints( true );
							}}
						/> :
						null
					}
					{ src ? <Button size="sm" variant="warning" onClick={() => {
						setSrc( null );
					}}>{props.t('reset')}</Button> : null }
					{renderSubmitButton()}
					{ props.solution ? solutionButton : null }
					{ props.chat ? <ChatButton for={id} /> : null }
				</div>
				<GradeFeedbackRenderer for={id} points={props.points} />
			</Card.Body>
		</Card>
	);
};


// PROPERTIES //

ImageQuestion.defaultProps = {
	question: '',
	hints: [],
	hintPlacement: 'bottom',
	feedback: true,
	chat: false,
	disableSubmitNotification: false,
	className: '',
	sketchpad: null,
	solution: null,
	until: null,
	points: 10,
	style: {},
	onSubmit() {}
};

ImageQuestion.propTypes = {
	question: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]),
	hintPlacement: PropTypes.string,
	hints: PropTypes.arrayOf(
		PropTypes.oneOfType([ PropTypes.string, PropTypes.node ])
	),
	feedback: PropTypes.bool,
	chat: PropTypes.bool,
	disableSubmitNotification: PropTypes.bool,
	className: PropTypes.string,
	sketchpad: PropTypes.object,
	solution: PropTypes.string,
	until: PropTypes.instanceOf( Date ),
	points: PropTypes.number,
	style: PropTypes.object,
	onSubmit: PropTypes.func
};


// EXPORTS //

export default withTranslation( 'image-question' )( ImageQuestion );
