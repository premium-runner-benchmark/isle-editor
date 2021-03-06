// MODULES //

import React, { Component, Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryArea } from 'victory';
import PropTypes from 'prop-types';
import roundn from '@stdlib/math/base/special/roundn';
import dnorm from '@stdlib/stats/base/dists/normal/pdf';
import pnorm from '@stdlib/stats/base/dists/normal/cdf';
import linspace from '@stdlib/math/utils/linspace';
import TeX from 'components/tex';
import NumberInput from 'components/input/number';
import Dashboard from 'components/dashboard';


// VARIABLES //

const colors = [
	'#e41a1c',
	'#377eb8',
	'#4daf4a',
	'#984ea3',
	'#ff7f00',
	'#ffff33'
];
const X = linspace( -30, 30, 200 );


// MAIN //

/**
* Learning component explaining the process of standardizing data.
*
* @property {boolean} showProbabilities - controls whether to display the probabilities
* @property {number} step - step size of the scroll input
*/
class Standardize extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			mean: 4,
			sd: 3,
			lower: -4,
			upper: 4,
			rangeProb: 1,
			area: []
		};
	}

	componentDidMount() {
		this.generateState( this.state.mean, this.state.sd );
	}

	reset = () => {
		this.setState({
			marked: [],
			unstandardizedLines: [],
			standardizedLines: [],
			eqn2: ''
		});
	}

	onStandardize = ( x ) => {
		let newMarked = this.state.marked.slice();
		newMarked.push( x );

		let eqn2 = '';
		let current = newMarked[ newMarked.length-1 ];
		let res = roundn( ( current - this.state.mean ) / this.state.sd, -4 );
		eqn2 = `z = \\frac{${current}-${roundn( this.state.mean, -2 )}}{${roundn( this.state.sd, -2 )}} = ${res}`;

		let unstandardizedLines = newMarked.map( ( x, id ) => {
			return ( <VictoryLine
				key={id}
				data={[ { x: x, y: 0 }, { x: x, y: 0.5 } ]}
				x={d => d.x}
				y={d => d.y}
				style={{
					data: { stroke: colors[ id%colors.length ] }
				}}
			/> );
		});
		let standardizedLines = newMarked.map( ( x, id ) => {
			return ( <VictoryLine
				key={id}
				data={[ { x: ( x-this.state.mean )/this.state.sd, y: 0 }, { x: ( x-this.state.mean )/this.state.sd, y: 0.5 } ]}
				x={d => d.x}
				y={d => d.y}
				style={{ data: { stroke: colors[ id%colors.length ] }}}
			/> );
		});

		this.setState({
			marked: newMarked,
			eqn2: eqn2,
			unstandardizedLines,
			standardizedLines
		});
	}

	generateState( mean, sd ) {
		const eqn = `Z = \\frac{X-${roundn( mean, -2 )}}{${roundn( sd, -2 )}}`;
		const data = X.map( x => {
			return {
				x: x,
				y: dnorm( x, mean, sd )
			};
		});
		this.setState({
			data: data,
			mean: mean,
			sd: sd,
			eqn: eqn,
			marked: [],
			eqn2: '',
			unstandardizedLines: [],
			standardizedLines: []
		});
	}

	renderNumberInputPanel() {
		return ( <Card style={{ marginBottom: 10 }}>
			<Card.Header as="h4">
				From Normal to Standard Normal
			</Card.Header>
			<Card.Body>
				<NumberInput
					legend="Mean"
					defaultValue={4}
					step={this.props.step}
					min={-25}
					max={25}
					onChange={mean => {
						this.generateState( mean, this.state.sd );
					}}
				/>
				<NumberInput
					legend="Standard Deviation"
					defaultValue={3}
					step={this.props.step}
					min={1}
					max={10}
					onChange={sd => {
						this.generateState( this.state.mean, sd );
					}}
				/>
			</Card.Body>
		</Card> );
	}

	renderUnstandardizedPlot() {
		return ( <Card>
			<Card.Header as="h4">
				Unstandardized
			</Card.Header>
			<Card.Body>
				<VictoryChart domain={{
					x: [ -30, 30 ],
					y: [ 0, 0.4 ]
				}}>
					<VictoryLine
						data={this.state.data}
					/>
					<VictoryAxis dependentAxis />
					<VictoryAxis label="x" />
					{this.state.unstandardizedLines}
				</VictoryChart>
				<Button variant="secondary" onClick={this.reset}>Reset</Button>
			</Card.Body>
		</Card> );
	}

	renderStandardizedPlot() {
		return ( <Card>
			<Card.Header as="h4">
				Standardized
			</Card.Header>
			<Card.Body>
				<VictoryChart domain={{
					x: [ -5, 5 ],
					y: [ 0, 0.4 ]
				}}>
					<VictoryAxis dependentAxis />
					<VictoryAxis label="z" />
					<VictoryLine
						samples={200}
						y={( data ) => {
							return dnorm( data.x, 0.0, 1.0 );
						}}
					/>
					{ this.props.showProbabilities && this.state.area.length > 0 ? <VictoryArea
						data={this.state.area}
						style={{
							data: {
								opacity: 0.3,
								fill: 'tomato'
							}
						}}
					/> : null
					}
					{this.state.standardizedLines}
				</VictoryChart>
				{ this.props.showProbabilities ? <Fragment>
					<span>Evaluate probabilities:</span>
					<TeX
						raw={`P( L = ${this.state.lower} < Z < U = ${this.state.upper}) = ${this.state.rangeProb.toFixed( 3 )}`}
						elems={{
							L: {
								variable: 'L',
								onChange: ( lower ) => {
									const len = 200;
									let x = linspace( lower, this.state.upper, len );
									let area = new Array( len );
									for ( let i = 0; i < x.length; i++ ) {
										area[ i ] = {
											x: x[ i ],
											y: dnorm( x[ i ], 0.0, 1.0 )
										};
									}
									const rangeProb = pnorm( this.state.upper, 0.0, 1.0 ) - pnorm( lower, 0.0, 1.0 );
									this.setState({
										area,
										rangeProb,
										lower
									});
								},
								defaultValue: this.state.lower
							},
							U: {
								variable: 'U',
								onChange: ( upper ) => {
									const len = 200;
									let x = linspace( this.state.lower, upper, len );
									let area = new Array( len );
									for ( let i = 0; i < x.length; i++ ) {
										area[ i ] = {
											x: x[ i ],
											y: dnorm( x[ i ], 0.0, 1.0 )
										};
									}
									const rangeProb = pnorm( upper, 0.0, 1.0 ) - pnorm( this.state.lower, 0.0, 1.0 );
									this.setState({
										area,
										rangeProb,
										upper
									});
								},
								defaultValue: this.state.upper
							}
						}}
						popoverPlacement="bottom"
						displayMode />
					</Fragment>: null
				}
			</Card.Body>
		</Card> );
	}

	render() {
		return (
			<Container>
				<Row>
					<Col md={12}>
						{this.renderNumberInputPanel()}
					</Col>
				</Row>
				<Row>
					<Col md={4}>
						{this.renderUnstandardizedPlot()}
					</Col>
					<Col md={4}>
						<Dashboard autoStart={false} title="Standardize values" label="Compute" id="learn_standardize" onGenerate={this.onStandardize}>
							<TeX raw={this.state.eqn} displayMode tag="" />
							<NumberInput
								legend="X value"
								defaultValue={0}
								step={this.props.step}
								min={-30}
								max={30}
							/>
						</Dashboard>
						<TeX
							raw={this.state.eqn2}
							displayMode
							tag=""
						/>
					</Col>
					<Col md={4}>
						{this.renderStandardizedPlot()}
					</Col>
				</Row>
			</Container>
		);
	}
}


// PROPERTIES //

Standardize.propTypes = {
	showProbabilities: PropTypes.bool,
	step: PropTypes.oneOf([
		PropTypes.number,
		PropTypes.string
	])
};


// DEFAULT PROPERTIES //

Standardize.defaultProps = {
	showProbabilities: false,
	step: 'any'
};


// EXPORTS //

export default Standardize;
