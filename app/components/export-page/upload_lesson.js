// MODULES //

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, ControlLabel, Form, FormControl,
	FormGroup, Modal, Panel } from 'react-bootstrap';
import FormData from 'form-data';
import https from 'https';
import http from 'http';
import request from 'request';
import archiver from 'archiver';
import randomstring from 'randomstring';
import path from 'path';
import fs from 'fs';
import os from 'os';
import logger from 'debug';
import contains from '@stdlib/assert/contains';
import replace from '@stdlib/string/replace';
import bundler from 'bundler';
import CheckboxInput from 'components/input/checkbox';
import Spinner from 'components/spinner';


// VARIABLES //

const ELECTRON_REGEXP = /node_modules[\\/]electron[\\/]dist/;
const IS_PACKAGED = !( ELECTRON_REGEXP.test( process.resourcesPath ) );
const debug = logger( 'isle-editor' );


// MAIN //

class UploadLesson extends Component {
	constructor( props ) {
		super( props );

		const lessonName = props.fileName ? replace( props.fileName, /.[^.]*$/, '' ) : '';

		// Initialize state variables...
		this.state = {
			spinning: false,
			namespaces: [],
			namespaceName: null,
			minify: true,
			lessonName,
			dirname: randomstring.generate(),
			server: localStorage.getItem( 'server' ),
			token: localStorage.getItem( 'token' ),
			showResponseModal: false,
			showConfirmModal: false
		};
	}

	componentDidMount() {
		if ( this.state.token ) {
			request.get( this.state.server+'/get_namespaces', {
				headers: {
					'Authorization': 'JWT ' + this.state.token
				},
				rejectUnauthorized: false
			}, ( error, response, body ) => {
				if ( error ) {
					return error;
				}
				body = JSON.parse( body );
				this.setState({
					namespaces: body.namespaces,
					namespaceName: body.namespaces[ 0 ].title
				});
			});
		}
	}

	handleInputChange = ( event ) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[ name ]: value
		});
	}

	handleSelectChange = ( event ) => {
		debug( 'Change the selected namespace...' );
		const target = event.target;
		const value = target.value;
		debug( 'The selected namespace is: ' + value );
		this.setState({
			namespaceName: value
		});
	}

	closeResponseModal = () => {
		this.setState({
			showResponseModal: false
		});
	}

	closeConfirmModal = () => {
		this.setState({
			showConfirmModal: false
		});
	}

	zipLesson = ( outputPath, outputDir, clbk ) => {
		let output = fs.createWriteStream( path.join( outputPath, outputDir+'.zip' ) );
		let archive = archiver( 'zip', {
			store: true
		});
		output.on( 'close', function onClose() {
			debug( archive.pointer() + ' total bytes' );
			debug( 'archiver has been finalized and the output file descriptor has closed.' );
			clbk();
		});
		archive.on( 'error', function onError( err ) {
			throw err;
		});
		archive.pipe( output );
		archive.directory( path.join( outputPath, outputDir ), '/' );
		archive.finalize();
	};

	upstreamData = ({ outputPath, outputDir }) => {
		let { lessonName, namespaceName } = this.state;

		debug( 'Sending POST request to create lesson...' );
		const form = new FormData();
		form.append( 'namespaceName', namespaceName );
		form.append( 'lessonName', lessonName );
		form.append( 'zipped', fs.createReadStream( path.join( outputPath, outputDir+'.zip' ) ) );

		const headers = form.getHeaders();
		headers[ 'Authorization' ] = 'JWT ' + this.state.token;

		const options = {
			method: 'post',
			path: '/create_lesson',
			headers: headers
		};
		let request;
		const re = /^https?:\/\/([^:]+):?([0-9]{0,5})/i;
		const matches = this.state.server.match( re );
		debug( 'Matches %s', matches );
		if ( contains( this.state.server, 'https' ) ) {
			options.host = matches[ 1 ];
			if ( matches[ 2 ]) {
				options.port = matches[ 2 ];
			}
			options.rejectUnauthorized = false;
			request = https.request( options );
		} else {
			options.host = matches[ 1 ];
			if ( matches[ 2 ]) {
				options.port = matches[ 2 ];
			}
			request = http.request( options );
		}
		form.pipe( request );

		request.on( 'response', ( res ) => {
			if ( res.statusCode === 200 ) {
				let lessonLink = this.state.server + '/' + namespaceName + '/' + lessonName;
				let msg = <span>
					The lesson has been uploaded successfully and can be accessed at the following address: <a href={lessonLink}>{lessonLink}</a>
				</span>;
				this.setState({
					spinning: false,
					showResponseModal: true,
					modalMessage: msg,
					dirname: randomstring.generate()
				});
			}
		});
		request.on( 'error', ( err ) => {
			debug( 'Encountered error: ' + err.message );
		});
	}

	checkLesson = () => {
		const qs = {
			namespaceName: this.state.namespaceName,
			lessonName: this.state.lessonName
		};
		debug( 'Querystring: '+JSON.stringify(qs) );
		request.get( this.state.server + '/get_lesson', {
			qs: qs,
			rejectUnauthorized: false
		}, ( err, res, body ) => {
			if ( err ) {
				return err;
			}
			if ( res.statusCode === 200 ) {
				body = JSON.parse( body );
				if ( body.lesson ) {
					this.setState({
						showConfirmModal: true
					});
				}
			} else {
				// Lesson does not exist:
				this.publishLesson();
			}
		});
	}

	publishLesson = () => {
		this.setState({
			spinning: true
		});
		const settings = {
			outputPath: os.tmpdir(),
			filePath: this.props.filePath,
			basePath: IS_PACKAGED ? path.join( process.resourcesPath, 'app' ) : '.',
			content: this.props.content,
			outputDir: this.state.dirname,
			minify: this.state.minify
		};
		bundler( settings, ( err ) => {
			this.zipLesson( settings.outputPath, settings.outputDir, () => {
				this.upstreamData( settings );
			});
		});
	}

	renderModals = () => {
		return (
			<Fragment>
				<Modal show={this.state.showResponseModal} onHide={this.closeResponseModal}>
				<Modal.Header closeButton>
					<Modal.Title>Server Response</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{this.state.modalMessage}
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.closeResponseModal}>Close</Button>
				</Modal.Footer>
				</Modal>
				<Modal show={this.state.showConfirmModal}>
					<Modal.Header>
						<Modal.Title>Overwrite Lesson?</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						A lesson with the name {this.state.lessonName} is already present in the namespace. Please confirm that you wish to overwrite the lesson or cancel the upload procedure and choose a different name.
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.closeConfirmModal}>Cancel</Button>
						<Button bsStyle="warning" onClick={() => {
							this.publishLesson();
							this.setState({
								showConfirmModal: false
							});
						}}>Overwrite</Button>
					</Modal.Footer>
				</Modal>
			</Fragment>
		);
	}

	renderUploadPanel = () => {
		return (
			<Panel bsStyle="primary">
				<Panel.Heading>
					<Panel.Title componentClass="h1">
						Upload Lesson
					</Panel.Title>
				</Panel.Heading>
				<Panel.Body>
					<p>Upload and deploy lessons directly to ISLE server.</p>
					{ this.state.token ?
						<Fragment>
							<Form>
								<FormGroup>
									<ControlLabel>Select Course</ControlLabel>
									<FormControl
										name="namespaceName"
										onChange={this.handleSelectChange}
										componentClass="select"
										placeholder="No courses found"
									>
										{this.state.namespaces.map( ( ns, id ) =>
											<option key={id} value={ns.title}>{ns.title}</option>
										)}
									</FormControl>
								</FormGroup>
								<FormGroup>
									<ControlLabel>Lesson name</ControlLabel>
									<FormControl
										name="lessonName"
										type="text"
										placeholder="Enter lesson name"
										onChange={this.handleInputChange}
										value={this.state.lessonName}
									/>
								</FormGroup>
								<FormGroup>
									<ControlLabel>Settings</ControlLabel>
									<CheckboxInput
										legend="Minify code"
										onChange={( value ) => {
											this.setState({
												minify: value
											});
										}}
										defaultValue={true}
									/>
								</FormGroup>
								<Button
									bsStyle="success"
									bsSize="sm"
									block
									onClick={this.checkLesson}
									disabled={this.state.spinning || !this.state.token || !this.state.lessonName}
								>Upload</Button>
							</Form>
							<br />
							<Spinner width={128} height={64} running={this.state.spinning} />
						</Fragment>:
						<Panel bsStyle="warning">
							<Panel.Body>
							You need to connect the ISLE editor to an ISLE server under settings before you can upload lessons.
							</Panel.Body>
						</Panel>
					}
				</Panel.Body>
			</Panel>
		);
	}

	render() {
		return (
			<Fragment>
				{this.renderUploadPanel()}
				{this.renderModals()}
			</Fragment>
		);
	}
}


// TYPES //

UploadLesson.defaultProps = {
	content: '',
	fileName: '',
	filePath: ''
};

UploadLesson.propTypes = {
	content: PropTypes.string,
	fileName: PropTypes.string,
	filePath: PropTypes.string
};


// EXPORTS //

export default UploadLesson;
