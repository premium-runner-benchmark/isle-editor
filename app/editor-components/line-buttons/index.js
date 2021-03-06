// MODULES //

import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import logger from 'debug';
import { ContextMenuTrigger } from 'react-contextmenu';
import { connect } from 'react-redux';
import PINF from '@stdlib/constants/math/float64-pinf';
import { jumpToElementInEditor, switchWithPrevious, switchWithNext } from 'actions';
import stopPropagation from 'utils/stop-propagation';
import './line_buttons.css';


// VARIABLES //

const debug = logger( 'isle:line-buttons' );


// MAIN //

/**
* A line wrapper for use in the editor.
*/
const LineButtons = ( props ) => {
	const [ { canDrop, isOver }, drop ] = useDrop({
		accept: 'component-wrapper',
		drop: ( item, monitor ) => {
			const thisLine = {
				startLineNumber: props.lineNumber,
				endLineNumber: props.lineNumber,
				startColumn: 0,
				endColumn: PINF
			};
			if ( item.startLineNumber > props.lineNumber ) {
				props.switchWithPrevious({
					current: item,
					previous: thisLine,
					elementRangeAction: 'switch_previous'
				});
			} else {
				props.switchWithNext({
					current: item,
					next: thisLine,
					elementRangeAction: 'switch_next'
				});
			}
			return void 0;
		},
		collect: ( monitor ) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop()
		})
	});
	if ( !props.showLineButtons || !props.show ) {
		return null;
	}
	const jumpToLine = ( event ) => {
		event.stopPropagation();
		const { lineNumber } = props;
		debug( 'Select line '+lineNumber );
		props.jumpToElementInEditor({
			startLineNumber: lineNumber,
			endLineNumber: lineNumber,
			elementRangeAction: 'reveal'
		});
	};
	const isActive = canDrop && isOver;
	let color;
	let icon;
	if ( isActive ) {
		color = 'green';
		icon = 'fa-check-circle fa-2x';
	}
	else if ( canDrop ) {
		color = '#258080';
		icon = 'fa-chevron-circle-down fa-2x';
	}
	else {
		icon = 'fa-plus-circle fa-lg';
	}

	/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
	return (
		<span className="line-buttons" onClick={stopPropagation} ref={drop} >
			{ props.splitPos !== 1 ? <span
				className="line-buttons-jump"
				role="button" tabIndex={0}
				onClick={jumpToLine}
				onKeyPress={jumpToLine}
				title={`Center editor on line ${props.lineNumber}`}
			>
				<span
					className="fa fa-arrow-circle-left"
				></span>
				<strong className="line-buttons-line-display" >
					{props.lineNumber}
				</strong>
			</span> : null }
			<ContextMenuTrigger
				id="editor-context-menu"
				renderTag="span"
				holdToDisplay={0}
				collect={() => {
					return {
						context: 'preview',
						lineNumber: props.lineNumber
					};
				}}
			>
				<i
					className={`line-buttons-contextmenu fas ${icon}`}
					title={`Click to insert component at line ${props.lineNumber}`}
					style={{ color }}
				></i>
			</ContextMenuTrigger>
		</span>
	);
};


// PROPERTIES //

LineButtons.propTypes = {
	show: PropTypes.bool,
	lineNumber: PropTypes.number.isRequired,
	jumpToElementInEditor: PropTypes.func.isRequired,
	switchWithNext: PropTypes.func.isRequired,
	switchWithPrevious: PropTypes.func.isRequired
};

LineButtons.defaultProps = {
	show: true
};


// EXPORTS //

export default connect( mapStateToProps, {
	jumpToElementInEditor, switchWithPrevious, switchWithNext
})( LineButtons );

function mapStateToProps({ preview, editor }) {
	return {
		...preview,
		splitPos: editor.splitPos
	};
}
