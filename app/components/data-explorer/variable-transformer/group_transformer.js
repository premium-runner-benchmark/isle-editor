// MODULES //

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import logger from 'debug';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormControl from 'react-bootstrap/FormControl';
import FormLabel from 'react-bootstrap/FormLabel';
import FormGroup from 'react-bootstrap/FormGroup';
import FormText from 'react-bootstrap/FormText';
import sample from '@stdlib/random/sample';
import absdiff from '@stdlib/math/base/utils/absolute-difference';
import objectKeys from '@stdlib/utils/keys';
import TextInput from 'components/input/text';
import NumberInput from 'components/input/number';
import { DATA_EXPLORER_GROUP_TRANSFORMER } from 'constants/actions.js';
import DraggableModalDialog from './draggable_modal_dialog.js';


// VARIABLES //

const debug = logger( 'isle:data-explorer:group-transformer' );


// MAIN //

class GroupTransformer extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			generatedName: '',
			nGroups: 2,
			groupProbs: [ 0.5, 0.5 ],
			labels: [ 'Group 1', 'Group 2' ]
		};
	}

	handleGeneratedNameChange = ( event ) => {
		this.setState({
			generatedName: event.target.value
		});
	}

	handleGroupNumberChange = ( nGroups ) => {
		const groupProbs = new Array( nGroups ).fill( 1/nGroups );
		const labels = new Array( nGroups );
		for ( let i = 0; i < labels.length; i++ ) {
			labels[ i ] = `Group ${i+1}`;
		}
		this.setState({
			groupProbs,
			labels,
			nGroups
		});
	}

	handleKeyPress = ( event ) => {
		if ( event.charCode === 13 ) {
			let sum = 0.0;
			for ( let i = 0; i < this.state.groupProbs.length; i++ ) {
				sum += this.state.groupProbs[ i ];
			}
			const hasValidValues = this.state.generatedName.length > 2 && absdiff( sum, 1.0 ) <= 1.5e-8;
			if ( hasValidValues ) {
				this.makeNewVar();
			}
		}
	}

	makeNewVar = () => {
		debug( 'Generating new categorical variable...' );
		const keys = objectKeys( this.props.data );
		const nobs = this.props.data[ keys[ 0 ] ].length;

		const values = sample( this.state.labels, {
			size: nobs,
			probs: this.state.groupProbs,
			replace: true
		});
		this.props.onGenerate( this.state.generatedName, values );
		this.props.logAction( DATA_EXPLORER_GROUP_TRANSFORMER, {
			name: this.state.generatedName,
			labels: this.state.labels,
			groupProbs: this.state.groupProbs
		});
		this.props.onHide();
	}

	renderTable() {
		const elems = new Array( this.state.nGroups );
		for ( let i = 0; i < elems.length; i++ ) {
			elems[ i ] = <Row key={i} >
				<Col>
					<TextInput
						legend={`Label for Group ${i+1}`}
						defaultValue={this.state.labels[ i ]}
						onChange={( val ) => {
							const labels = this.state.labels.slice();
							labels[ i ] = val;
							this.setState({ labels });
						}}
					/>
				</Col>
				<Col>
					<NumberInput
						legend="Group Proportion"
						onChange={( val ) => {
							const groupProbs = this.state.groupProbs.slice();
							groupProbs[ i ] = val;
							this.setState({ groupProbs });
						}}
						defaultValue={this.state.groupProbs[ i ]}
						step={0.01}
						min={0}
						max={1}
						numbersOnly={false}
					/>
				</Col>
			</Row>;
		}
		return (
			<Fragment>
				{elems}
				<p>Proportions must add up to one.</p>
			</Fragment>
		);
	}

	render() {
		let sum = 0.0;
		for ( let i = 0; i < this.state.groupProbs.length; i++ ) {
			sum += this.state.groupProbs[ i ];
		}
		const hasValidValues = this.state.generatedName.length > 2 && absdiff( sum, 1.0 ) <= 1.5e-8;
		return (
			<Modal
				dialogAs={DraggableModalDialog}
				dialogClassName='modal-60w input'
				onHide={this.props.onHide}
				show={this.props.show}
				backdrop={false}
				bsPrefix="draggable-modal"
				tabIndex={0} role="button"
			>
				<Modal.Header closeButton className="draggable-modal-header" >
					<Modal.Title>Create group variables (e.g., for training/test set split or cross-validation)</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col>
							<NumberInput
								legend="Number of groups"
								onChange={this.handleGroupNumberChange}
								defaultValue={this.state.nGroups}
								step={1}
								min={1}
								max={99}
							/>
						</Col>
					</Row>
					{this.renderTable()}
					<Row>
						<FormGroup style={{ margin: 8 }}>
							<FormLabel>Name of new variable:</FormLabel>
							<FormControl
								type="text"
								placeholder="Select name..."
								onChange={this.handleGeneratedNameChange}
								onKeyPress={this.handleKeyPress}
							/>
							<FormText>
								The new variable will be appended as a new column to the data table.
							</FormText>
						</FormGroup>
					</Row>
				</Modal.Body>
				<Modal.Footer style={{ justifyContent: 'center' }}>
					<Button onClick={this.makeNewVar} disabled={!hasValidValues}>
						Create new variable
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}


// PROPERTIES //

GroupTransformer.defaultProps = {
	logAction() {}
};

GroupTransformer.propTypes = {
	data: PropTypes.object.isRequired,
	onGenerate: PropTypes.func.isRequired,
	logAction: PropTypes.func,
	onHide: PropTypes.func.isRequired,
	show: PropTypes.bool.isRequired
};


// EXPORTS //

export default GroupTransformer;