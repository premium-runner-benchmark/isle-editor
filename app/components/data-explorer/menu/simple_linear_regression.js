// MODULES //

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from '@stdlib/utils/copy';
import contains from '@stdlib/assert/contains';
import CheckboxInput from 'components/input/checkbox';
import SelectInput from 'components/input/select';
import Dashboard from 'components/dashboard';
import SimpleLinearRegression from 'components/models/simple-linear-regression';
import { DATA_EXPLORER_LINEAR_REGRESSION } from 'constants/actions.js';
import QuestionButton from './../question_button.js';


// VARIABLES //

const DESCRIPTION = 'Statistical model which estimates a best-fit line for a response variable of interest (Y) given exactly one predictor variable (X). The line is determined by its intercept (Y-value at X = 0) and slope (the increase in Y associated with a unit increase of X).';


// MAIN //

class SimpleLinearRegressionMenu extends Component {
	constructor( props ) {
		super( props );
	}

	fitRegression = ( yval, xval, group, omitMissing ) => {
		const output = <SimpleLinearRegression
			yval={yval} xval={xval}
			group={group} omitMissing={omitMissing}
			data={this.props.data}
			onPredict={( yhat, resid, counter ) => {
				const newData = copy( this.props.data, 1 );
				const newQuantitative = this.props.quantitative.slice();
				let name = 'pred_slm'+counter;
				newData[ name ] = yhat;
				if ( !contains( newQuantitative, name ) ) {
					newQuantitative.push( name );
				}
				name = 'resid_slm'+counter;
				if ( !contains( newQuantitative, name ) ) {
					newQuantitative.push( name );
				}
				newData[ name ] = resid;
				this.props.onGenerate( newQuantitative, newData );
			}}
			onDiagnostics={this.props.onCreated}
		/>;
		this.props.logAction( DATA_EXPLORER_LINEAR_REGRESSION, {
			yval, xval, group, omitMissing
		});
		this.props.onCreated( output );
	}

	render() {
		const { quantitative, categorical } = this.props;
		return (
			<Dashboard
				title={<span>Simple Linear Regression<QuestionButton title="Simple Linear Regression" content={DESCRIPTION} /></span>}
				autoStart={false}
				onGenerate={this.fitRegression}
			>
				<SelectInput
					legend="Response Variable (Y):"
					defaultValue={quantitative[ 0 ]}
					options={quantitative}
				/>
				<SelectInput
					legend="Explanatory Variable (X):"
					defaultValue={quantitative[ 1 ]}
					options={quantitative}
				/>
				<SelectInput
					legend="Group By:"
					options={categorical}
					clearable={true}
					menuPlacement="top"
				/>
				<CheckboxInput
					legend="Omit missing values"
					defaultValue={false}
				/>
			</Dashboard>
		);
	}
}


// PROPERTIES //

SimpleLinearRegressionMenu.defaultProps = {
	categorical: [],
	logAction() {}
};

SimpleLinearRegressionMenu.propTypes = {
	categorical: PropTypes.array,
	quantitative: PropTypes.array.isRequired,
	data: PropTypes.object.isRequired,
	logAction: PropTypes.func,
	onGenerate: PropTypes.func.isRequired,
	onCreated: PropTypes.func.isRequired
};


// EXPORTS //

export default SimpleLinearRegressionMenu;