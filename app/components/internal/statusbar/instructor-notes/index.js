// MODULES //

import React, { Component } from 'react';
import logger from 'debug';
import TextEditor from 'components/text-editor';
import './instructor_notes.css';


// VARIABLES //

const debug = logger( 'isle:instructor-notes' );


// MAIN //

class InstructorNotes extends Component {
	constructor( props ) {
		super( props );
	}

	render() {
		debug( 'Rendering instructor notes...' );
		return (
			<TextEditor
				id="instructor-notes"
				className="instructor-notes"
				mode="collaborative"
				allowSubmissions={false}
				toolbarConfig={[
					'bold',
					'italic',
					'underline',
					'heading',
					'|',
					'open_markdown',
					'save',
					'preview'
				]}
			/>
		);
	}
}


// EXPORTS //

export default InstructorNotes;