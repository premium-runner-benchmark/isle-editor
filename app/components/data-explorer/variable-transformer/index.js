// MODULES //

import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import BinTransformer from './bin_transformer.js';
import FormulaTransformer from './formula_transformer.js';
import CategoricalModal from './categorical_transformer.js';
import GroupModal from './group_transformer.js';


// MAIN //

const Transformer = ( props ) => {
	const { data, categorical, quantitative, t, session, defaultCode, logAction, onGenerate } = props;
	const [ active, setActive ] = useState( null );

	const toggleFormulaModal = () => {
		const newActive = active === 'formula' ? null : 'formula';
		setActive( newActive );
		props.onActive( newActive );
	};
	const toggleBinModal = () => {
		const newActive = active === 'bin' ? null : 'bin';
		setActive( newActive );
		props.onActive( newActive );
	};
	const toggleCategoricalModal = () => {
		const newActive = active === 'categorical' ? null : 'categorical';
		setActive( newActive );
		props.onActive( newActive );
	};
	const toggleGroupModal = () => {
		const newActive = active === 'group' ? null : 'group';
		setActive( newActive );
		props.onActive( newActive );
	};
	let modal;
	if ( data ) {
		switch ( active ) {
			case 'bin':
				modal = <BinTransformer
					show={true}
					onHide={toggleBinModal}
					quantitative={quantitative}
					logAction={logAction}
					onGenerate={onGenerate}
					data={data}
					t={t}
				/>;
			break;
			case 'categorical':
				modal = <CategoricalModal
					show={true}
					onHide={toggleCategoricalModal}
					categorical={categorical}
					logAction={logAction}
					onGenerate={onGenerate}
					data={data}
					t={t}
				/>;
			break;
			case 'formula':
				modal = <FormulaTransformer
					show={true}
					onHide={toggleFormulaModal}
					categorical={categorical}
					quantitative={quantitative}
					data={data}
					defaultCode={defaultCode}
					logAction={logAction}
					onGenerate={onGenerate}
					session={session}
					t={t}
				/>;
			break;
			case 'group':
				modal = <GroupModal
					show={true}
					onHide={toggleGroupModal}
					logAction={logAction}
					onGenerate={onGenerate}
					data={data}
					t={t}
				/>;
			break;
		}
	}
	return (
		<Fragment>
			<div className="well" style={{ padding: 15, margin: 15 }} >
				<div style={{ padding: 12 }} >
					<Button
						onClick={toggleFormulaModal}
						variant="primary"
						block
						style={{ fontSize: '1.2em' }}
					>
						{t('interactions-functions')}
					</Button>
				</div>
				<div style={{ padding: 12 }} >
					<Button
						onClick={toggleBinModal}
						disabled={quantitative.length === 0}
						variant="primary"
						block
						style={{ fontSize: '1.2em' }}
					>
						{t('bin-quantitative')}
					</Button>
				</div>
				<div style={{ padding: 12 }} >
					<Button
						onClick={toggleCategoricalModal}
						disabled={categorical.length === 0}
						variant="primary"
						block
						style={{ fontSize: '1.2em' }}
					>
						{t('rename-or-combine')}
					</Button>
				</div>
				<div style={{ padding: 12 }} >
					<Button
						onClick={toggleGroupModal}
						variant="primary"
						block
						style={{ fontSize: '1.2em' }}
					>
						{t('create-groups')}
					</Button>
				</div>
			</div>
			{modal}
		</Fragment>
	);
};


// PROPERTIES //

Transformer.defaultProps = {
	logAction() {},
	onActive() {},
	onGenerate() {},
	defaultCode: '',
	session: {}
};

Transformer.propTypes = {
	categorical: PropTypes.array.isRequired,
	quantitative: PropTypes.array.isRequired,
	data: PropTypes.object.isRequired,
	defaultCode: PropTypes.string,
	logAction: PropTypes.func,
	onActive: PropTypes.func,
	onGenerate: PropTypes.func,
	session: PropTypes.object
};


// EXPORTS //

export default Transformer;
