// MODULES //

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';


// MAIN //

class DeletePageModal extends Component {
	clickHide = () => {
		this.props.onHide();
	}

	handleClick = () => {
		this.props.onSubmit();
		this.props.onHide();
	}

	render() {
		return ( <Modal
			onHide={this.clickHide}
			show={this.props.show}
			dialogClassName="modal-w30"
		>
			<Modal.Header closeButton>
				<Modal.Title as="h4">Clear Page?</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Are you sure you want to delete the elements on the current page?
			</Modal.Body>
			<Modal.Footer>
				<Button variant="danger" onClick={this.handleClick} block>Clear</Button>
			</Modal.Footer>
		</Modal> );
	}
}


// PROPERTIES //

DeletePageModal.propTypes = {
	onHide: PropTypes.func,
	onSubmit: PropTypes.func,
	show: PropTypes.bool.isRequired
};

DeletePageModal.defaultProps = {
	onHide() {},
	onSubmit() {}
};


// EXPORTS //

export default DeletePageModal;