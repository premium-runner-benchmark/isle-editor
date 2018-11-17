// MODULES //

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import removeLast from '@stdlib/string/remove-last';


// FUNCTIONS //

function toTimeString( absoluteTime ) {
	const date = new Date( absoluteTime );
	return `${date.toLocaleDateString()}, ${date.toLocaleTimeString()}`;
}


// MAIN //

const SingleActionModal = ( props ) => {
	return (
		<Modal
			show={props.showModal}
			onHide={props.hideModal}
			dialogClassName="modal-75w"
			backdropClassName="modal-backdrop-second-order"
			style={{
				minHeight: '300px',
				boxShadow: '0 0 10px black',
				fontSize: '2em',
				zIndex: 2000
			}}
		>
			<Modal.Header closeButton>
				<Modal.Title as="h3">
					{removeLast( props.actionLabel) }
					{ props.showExtended ? ` from ${props.modalContent.name}`: ''}
					{' on '}
					{toTimeString( props.modalContent.absoluteTime )}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ color: 'darkred' }}>
				{props.modalContent.value}
			</Modal.Body>
		</Modal>
	);
};


// EXPORTS //

export default SingleActionModal;
