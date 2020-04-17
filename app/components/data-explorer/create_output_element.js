// MODULES //

import React, { Fragment } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'components/table';
import logger from 'debug';
import isArray from '@stdlib/assert/is-array';
import entries from '@stdlib/utils/entries';
import replace from '@stdlib/string/replace';
import ClearButton from './clear_button.js';
import FullscreenButton from './fullscreen_button.js';
import DatasetButton from './dataset_button.js';


// VARIABLES //

const debug = logger( 'isle:data-explorer' );
const RE_CLEAR_BUTTON = /<button[\s\S]*<\/button>/;


// FUNCTIONS //

const createButtons = ( header, table, clearOutput, idx, subsetFilters, onFilters ) => {
	return ( <ButtonGroup style={{ float: 'right', top: '-4px' }}>
		<DatasetButton filters={subsetFilters} onActivateFilters={onFilters} />
		<FullscreenButton header={header} table={table} />
		<ClearButton onClick={() => {
			debug( `Clear element with ID ${idx}` );
			clearOutput( idx );
		}} />
	</ButtonGroup> );
};


/**
* Wraps the supplied div element such that it can be dragged.
*/
const makeDraggable = ( div ) => {
	return (
		<Fragment>
			<div
				draggable={true}
				className="data-explorer-draggable-bar"
				onDragStart={( ev ) => {
					const div = ev.target.nextSibling;
					let markup = div.innerHTML;
					markup = replace( markup, RE_CLEAR_BUTTON, '' );
					ev.dataTransfer.setData( 'text/plain', markup );
					ev.dataTransfer.setData( 'text/html', markup );
				}}
			>
				Drag Table
			</div>
			{div}
		</Fragment>
	);
};

const renderIQRTable = ( e, idx, clearOutput, subsetFilters, onFilters ) => {
	const table = <Table bordered size="sm">
		<thead>
			<tr>
				<th>{e.variable}</th>
				<th>IQR</th>
				<th>Lower</th>
				<th>Upper</th>
				<th>N</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td></td>
				{e.result.value[0].map( ( e, i ) => <td key={i}>{e.toFixed( 3 )}</td> )}
				<td>{e.result.size}</td>
			</tr>
		</tbody>
	</Table>;
	return ( <pre key={idx}>
		{createButtons( 'Interquartile Range', table, clearOutput, idx, subsetFilters, onFilters )}
		{makeDraggable( table )}
	</pre> );
};

const renderRangeTable = ( e, idx, clearOutput, subsetFilters, onFilters ) => {
	const table = <Table bordered size="sm">
		<thead>
			<tr>
				<th>{e.variable}</th>
				<th>Range</th>
				<th>Min</th>
				<th>Max</th>
				<th>N</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td></td>
				{e.result.value[0].map( ( e, i ) => <td key={i}>{e.toFixed( 3 )}</td> )}
				<td>{e.result.size}</td>
			</tr>
		</tbody>
	</Table>;
	return ( <pre key={idx}>
		{createButtons( 'Range', table, clearOutput, idx, subsetFilters, onFilters )}
		{makeDraggable( table )}
	</pre> );
};


// MAIN //

function createOutputElement( e, idx, clearOutput, subsetFilters, onFilters ) {
	if ( e.type === 'Chart' ) {
		if ( e.value.props.meta && !e.value.props.meta.filters ) {
			e.value.props.meta.filters = subsetFilters;
		}
		return ( <div key={idx}>
			<ButtonGroup style={{ float: 'right', padding: '0.1rem 0.3rem', zIndex: 1 }}>
				<DatasetButton filters={subsetFilters} onActivateFilters={onFilters} />
				<ClearButton
					onClick={() => { clearOutput( idx ); }}
				/>
			</ButtonGroup>
			<div style={{
				position: 'relative',
				height: 300,
				marginTop: 0,
				marginBottom: 40,
				marginRight: 25
			}} >
				{e.value}
			</div>
		</div> );
	}
	else if ( e.type === 'Test' ) {
		const elem = <pre key={idx} >
			{createButtons( e.type, e.value, clearOutput, idx, subsetFilters, onFilters )}
			{e.value}
		</pre>;
		return elem;
	}
	else if (
		e.type === 'Contingency Table' ||
		e.type === 'Frequency Table' ||
		e.type === 'Grouped Frequency Table' ||
		e.type === 'Simple Linear Regression' ||
		e.type === 'Multiple Linear Regression' ||
		e.type === 'LASSO Regression' ||
		e.type === 'Logistic Regression' ||
		e.type === 'PCA' ||
		e.type === 'kmeans' ||
		e.type === 'Naive Bayes' ||
		e.type === 'Random Forest'
	) {
		const elem = <pre key={idx} >
			{createButtons( e.type, e.value, clearOutput, idx, subsetFilters, onFilters )}
			{makeDraggable( e.value )}
		</pre>;
		return elem;
	}
	else if (
		e.type === 'Decision Tree' ||
		e.type === 'Hierarchical Clustering'
	) {
		const elem = <pre key={idx}>
			<ButtonGroup style={{ float: 'right', padding: '0.1rem 0.3rem', top: '-1px' }} >
				<DatasetButton
					filters={subsetFilters} onActivateFilters={onFilters}
					style={{
						right: 55, position: 'absolute'
					}}
				/>
				<ClearButton
					onClick={() => { clearOutput( idx ); }}
					style={{
						right: -5, position: 'absolute'
					}}
				/>
			</ButtonGroup>
			<div style={{ marginTop: 25 }}>{e.value}</div>
		</pre>;
		return elem;
	}
	else if ( e.type === 'Statistics' ) {
		if ( e.group ) {
			if ( e.statistics.length === 1 ) {
				const table = <Table bordered size="sm">
					<thead>
					{ e.statistics[0] === 'Range' ?
						<tr>
							<th className="not-sortable" >{e.variable}</th>
							<th>{e.group}</th>
							<th>Range</th>
							<th>Min</th>
							<th>Max</th>
							<th>N</th>
						</tr>: null
					}
					{ e.statistics[0] === 'Interquartile Range' ?
						<tr>
							<th className="not-sortable" >{e.variable}</th>
							<th>{e.group}</th>
							<th>IQR</th>
							<th>Lower</th>
							<th>Upper</th>
							<th>N</th>
						</tr>: null
					}
					{ e.statistics[0] !== 'Range' && e.statistics[0] !== 'Interquartile Range' ?
						<tr>
							<th className="not-sortable" >{e.variable}</th>
							<th>{e.group}</th>
							<th>{e.statistics[0]}</th>
							<th>N</th>
						</tr>: null
					}
					</thead>
					<tbody>
					{entries( e.result ).map( ( arr, i ) => {
						const val = arr[ 1 ].value[ 0 ];
						if ( isArray( val ) ) {
							return (
								<tr key={i} >
									<td></td>
									<td>{arr[ 0 ]}</td>
									{arr[ 1 ].value.map( ( x, j ) => {
										return <td key={j}>{x.toFixed( 3 )}</td>;
									})}
									<td>{arr[ 1 ].size}</td>
								</tr>
							);
						}
						return (
							<tr key={i} >
								<td></td>
								<td>{arr[ 0 ]}</td>
								<td>{val.toFixed( 3 )} </td>
								<td>{arr[ 1 ].size} </td>
							</tr>
						);
					})}
					</tbody>
				</Table>;
				const elem = <pre key={idx} >
					{createButtons( e.type, table, clearOutput, idx, subsetFilters, onFilters )}
					{makeDraggable( table )}
				</pre>;
				return elem;
			}
			// Case: more than one statistic calculated
			const table = <Table bordered size="sm" >
				<thead>
					<tr>
						<th className="not-sortable" >{e.variable}</th>
						<th>{e.group}</th>
						{e.statistics.map( ( name, i ) => {
							return <th key={i}>{name}</th>;
						})}
						<th>N</th>
					</tr>
				</thead>
				<tbody>
					{entries( e.result ).map( ( arr, i ) => {
						return (
							<tr key={i} >
								<td></td>
								<td>{arr[ 0 ]}</td>
								{arr[ 1 ].value.map( ( v, i ) => {
									if ( isArray( v ) ) {
										return <td key={i} >{v[ 0 ].toFixed( 3 )}</td>;
									}
									return <td key={i} >{v.toFixed( 3 )}</td>;
								})}
								<td>{arr[ 1 ].size} </td>
							</tr>
						);
					})}
				</tbody>
			</Table>;
			const elem = <pre key={idx} >
				{createButtons( e.type, table, clearOutput, idx, subsetFilters, onFilters )}
				{makeDraggable( table )}
			</pre>;
			return elem;
		}
		if ( e.statistics.length === 1 ) {
			if ( e.statistics[0] === 'Range' ) {
				return renderRangeTable( e, idx, clearOutput, subsetFilters, onFilters );
			}
			if ( e.statistics[0] === 'Interquartile Range' ) {
				return renderIQRTable( e, idx, clearOutput, subsetFilters, onFilters );
			}
			const { value, size } = e.result;
			const table = <Table bordered size="sm">
				<thead>
					<tr>
						<th className="not-sortable" >{e.variable}</th>
						<th>{e.statistics[0]}</th>
						<th>N</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						<td>{value[0].toFixed( 3 )}</td>
						<td>{size}</td>
					</tr>
				</tbody>
			</Table>;
			const elem = <pre key={idx} >
				{createButtons( e.type, table, clearOutput, idx, subsetFilters, onFilters )}
				{makeDraggable( table )}
			</pre>;
			return elem;
		}
		// Case: more than one statistic calculated
		const { value, size } = e.result;
			const table = <Table bordered size="sm">
				<thead>
					<tr>
						<th className="not-sortable" >{e.variable}</th>
						{e.statistics.map( ( name, i ) => {
							return <th key={i}>{name}</th>;
						})}
						<th>N</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						{value.map( ( v, i ) => {
							if ( isArray( v ) ) {
								// Case: Range or IQR, use first element:
								return <td key={i} >{v[ 0 ].toFixed( 3 )}</td>;
							}
							return <td key={i} >{v.toFixed( 3 )}</td>;
						})}
						<td>{size}</td>
					</tr>
				</tbody>
			</Table>;
			const elem = <pre key={idx} >
				{createButtons( e.type, table, clearOutput, idx, subsetFilters, onFilters )}
				{makeDraggable( table )}
			</pre>;
			return elem;
	}
	return null;
}


// EXPORTS //

export default createOutputElement;