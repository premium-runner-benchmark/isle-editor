// MODULES //

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import inmap from '@stdlib/utils/inmap';
import roundn from '@stdlib/math/base/special/roundn';
import sample from '@stdlib/random/sample';
import absdiff from '@stdlib/math/base/utils/absolute-difference';
import incrspace from '@stdlib/math/utils/incrspace';
import NumberInput from 'components/input/number';
import FeedbackButtons from 'components/feedback';


// MAIN //

/**
* A learning component illustrating the law of large numbers using dice throwing.
*/
class DiceThrowing extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			sides: new Array( 6 ),
			tally: [ 0, 0, 0, 0, 0, 0 ],
			nThrows: 0,
			sideProbs: [ 1/6, 1/6, 1/6, 1/6, 1/6, 1/6 ],
			valid: true
		};
	}

	chooseNSides = ( sides ) => {
		const tally = new Array( sides );
		const sideProbs = new Array( sides );
		inmap( sideProbs, x => 1/sides );
		inmap( tally, x => 0 );
		this.setState({
			sides: new Array( sides ),
			sideProbs,
			tally,
			valid: true,
			draw: null,
			nThrows: 0
		});
	}

	throwDice = ( nTimes ) => {
		const elems = incrspace( 1, this.state.sides.length+1, 1 );
		const out = sample( elems, {
			probs: this.state.sideProbs,
			size: nTimes
		});
		const tally = this.state.tally.slice();
		for ( let i = 0; i < out.length; i++ ) {
			tally[ out[ i ]-1 ] += 1;
		}
		this.setState({
			draw: out,
			tally,
			nThrows: this.state.nThrows + nTimes
		});
	}

	renderGrid() {
		return (
			<Container fluid={true}>
				<Row>
					<Col md={5}>
						<h3>Probabilities:</h3>
						{inmap( this.state.sides, ( x, i ) => ( <NumberInput
							key={i}
							legend={`Side ${i+1}`}
							defaultValue={1/this.state.sides.length}
							step="any"
							max={1}
							min={0}
							width={100}
							numbersOnly={false}
							onChange={( val )=>{
								const sideProbs = this.state.sideProbs.slice();
								sideProbs[ i ] = val;
								let sum = 0.0;
								for ( let i = 0; i < sideProbs.length; i++ ) {
									sum += sideProbs[ i ];
								}
								const tally = new Array( sideProbs.length );
								inmap( tally, x => 0 );
								this.setState({
									sideProbs,
									valid: absdiff( sum, 1.0 ) <= 1.5e-8,
									tally,
									draw: null
								});
							}}
						/> ) )}
						<Button onClick={() => {
							this.setState({
								tally: this.state.tally.map( x => 0 ),
								nThrows: 0
							});
						}}>Reset</Button>
					</Col>
					<Col md={6}>
						{this.renderDice()}
					</Col>
					<Col md={1}>
						<FeedbackButtons
							id="loaded_dice"
							vertical
						/>
					</Col>
				</Row>
			</Container>
		);
	}

	renderDice() {
		if ( !this.state.valid ) {
			return ( <Card body>
				<h3>Please make sure that all probabilities add up to one</h3>
			</Card> );
		}
		return ( <Card fluid={true}>
			<Card.Header>Dice</Card.Header>
			<Card.Body>
				<Card body>{ this.state.draw ? this.state.draw.join( ' - ' ) : 'X' }</Card>
				<ButtonGroup>
					<Button onClick={() => {
						this.throwDice( 1 );
					}}>Throw ⚅ 1x</Button>
					<Button onClick={() => {
						this.throwDice( 5 );
					}}>Throw ⚅ 5x</Button>
					<Button onClick={() => {
						this.throwDice( 10 );
					}}>Throw ⚅ 10x</Button>
				</ButtonGroup>
			</Card.Body>
		</Card> );
	}

	renderTable() {
		return (
			<table className="table table-bordered table-responsive-sm">
				<tbody>
					<tr>
						<th>Side:</th>
						{ this.state.tally.map( ( elem, idx ) => { return <td key={idx}>{idx+1}</td>; })}
					</tr>
					<tr>
						<th>Count:</th>
						{ this.state.tally.map( ( elem, idx ) => { return <td key={idx}>{elem}</td>; })}
					</tr>
					<tr>
						<th>Relative Frequency:</th>
						{ this.state.tally.map( ( elem, idx ) => { return <td key={idx}>{roundn( elem/this.state.tally.reduce( ( a, b ) => a+b ), -3 ) || '0.000' }</td>; })}
					</tr>
				</tbody>
			</table>
		);
	}

	render() {
		return (
			<Card id="diceThrowingModule" style={{ maxWidth: 1200, margin: '0 auto' }}>
				<Card.Header as="h4">
					Simulate Random Dice Throws
				</Card.Header>
				<Card.Body>
					<NumberInput
						legend="Number of Sides"
						defaultValue={6}
						step={1}
						max={20}
						min={2}
						onChange={this.chooseNSides}
					/>
					<p>Choose custom probabilities for the sides and then throw some dice!</p>
						{this.renderGrid()}
						{this.renderTable()}
					<p>Total number of throws: {this.state.nThrows}</p>
				</Card.Body>
			</Card>
		);
	}
}


// EXPORTS //

export default DiceThrowing;
