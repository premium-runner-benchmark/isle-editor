// MODULES //

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CopyToClipboard from 'react-copy-to-clipboard';
import randomstring from 'utils/randomstring/alphanumeric';
import Viewer from 'react-viewer';
import './image.css';


// MAIN //

/**
* Component to display an image.
*
* @property {string} src - image source location
* @property {string} body - base64 encoded data of image
* @property {number} height - image height (in px)
* @property {number} width - image width (in px)
* @property {string} id - component identifier
* @property {boolean} showModal - controls whether to display fullscreen modal view
* @property {string} alt - image description
* @property {Function} onShare - callback invoked with the image if the "share" button is clicked
*/
class Image extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			showModal: false
		};
	}

	closeModal = () => {
		this.setState({ showModal: false });
	}

	renderModal() {
		if ( !this.state.showModal ) {
			this.containerDiv = null;
			return null;
		}
		return (
			<Fragment>
				<Modal
					show={this.state.showModal}
					onHide={this.closeModal}
					title={this.props.alt}
					backdrop={true}
					dialogClassName="modal-100w"
				>
					<Modal.Body
						style={{ height: 'calc(100vh - 80px)', 'position': 'relative' }}
					>
						<div style={{ height: '100%' }} ref={( div ) => {
							if ( !this.containerDiv ) {
								this.containerDiv = div;
								this.forceUpdate();
							}
						}} ></div>
						{ this.containerDiv ? <Viewer
							container={this.containerDiv}
							visible={this.state.showModal}
							images={[
								{
									src: this.props.src,
									alt: this.props.alt
								}
							]}
							noNavbar noClose showTotal={false} downloadable={false}
							changeable={false} zoomSpeed={0.1}
						/> : null }
					</Modal.Body>
					<Modal.Footer>
						{ this.props.body ?
							<CopyToClipboard text={this.props.body} onCopy={this.closeModal}><Button variant="secondary">Copy SVG</Button></CopyToClipboard> : null
						}
						{ this.props.onShare ?
							<Button variant="secondary" onClick={() => {
								this.props.onShare( this.props.src );
								this.closeModal();
							}}>
								Share
							</Button> : null
						}
						<CopyToClipboard text={`<img src="${this.props.src}" width="400" height="300" />`} onCopy={this.closeModal}><Button variant="secondary">Copy Link</Button></CopyToClipboard>
						<Button variant="secondary" href={this.props.src} download="plot.png" >Save Plot</Button>
						<Button variant="secondary" onClick={this.closeModal}>Close</Button>
					</Modal.Footer>
				</Modal>
			</Fragment>
		);
	}

	render() {
		return (
			<Fragment>
				<img
					className="isle-image"
					alt={this.props.alt}
					src={this.props.src}
					width={this.props.width}
					height={this.props.height}
					role="presentation"
					onClick={() => {
						if ( this.props.showModal ) {
							this.setState({
								showModal: true
							});
						}
					}}
					onDragStart={( ev ) => {
						const plotData = {
							key: `<!--IMAGE_LOG:${this.props.id}_${randomstring( 6 )}-->`,
							value: `<img src="${this.props.body}" width="400" height="300" style="display: block; margin: 0 auto;" />`
						};
						ev.dataTransfer.setData( 'text', `<img src="${this.props.src}" width="400" height="300" />` );
						ev.dataTransfer.setData( 'text/html', plotData.value );
						ev.dataTransfer.setData( 'text/plain', plotData.key );
					}}
				/>
				{this.renderModal()}
			</Fragment>
		);
	}
}


// PROPERTIES //

Image.propTypes = {
	body: PropTypes.string,
	height: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]).isRequired,
	width: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]),
	id: PropTypes.string,
	onShare: PropTypes.func,
	showModal: PropTypes.bool,
	src: PropTypes.string.isRequired,
	alt: PropTypes.string
};

Image.defaultProps = {
	body: null,
	id: null,
	width: null,
	onShare: null,
	showModal: true,
	alt: ''
};


// EXPORTS //

export default Image;
