// MODULES //

import logger from 'debug';
import markdownit from 'markdown-it';
import trim from '@stdlib/string/trim';
import replace from '@stdlib/string/replace';
import hasOwnProp from '@stdlib/assert/has-own-property';
import { replaceAndEscapeEquations, replaceEquations } from './replace_equations.js';


// VARIABLES //

const debug = logger( 'isle:tokenizer' );
const IN_BASE = 0;
const IN_OPENING_TAG = 1;
const IN_OPENING_TAG_NAME = 2;
const IN_CLOSING_TAG = 3;
const IN_STRING_ATTRIBUTE = 4;
const IN_JSX_ATTRIBUTE = 5;
const IN_JSX_STRING = 6;
const IN_JSX_OBJECT = 7;
const IN_JSX_ARRAY = 8;
const IN_JSX_EXPRESSION = 9;
const IN_JSX_OTHER = 10;
const IN_BETWEEN_TAGS = 11;
const IN_ANGLE_LINK = 12;

const md = markdownit({
	html: true,
	xhtmlOut: true,
	breaks: true,
	typographer: false
});
const RE_LINE_BEGINNING = /\n\s*/g;


// FUNCTIONS //

/**
* Tests whether character is a quotation mark.
*
* @param {string} c - input character
* @returns {boolean} boolean indicating whether character is a quotation mark
*/
function isQuotationMark( c ) {
	return (
		c === '\'' ||
		c === '"'
	);
}

function trimLineStarts( str ) {
	return replace( str, RE_LINE_BEGINNING, '\n' );
}

/**
* Tests whether character is whitespace.
*
* @param {string} c - input character
* @returns {boolean} boolean indicating whether character is whitespace
*/
function isWhitespace( c ) {
	return (
		c === ' ' ||
		c === '\n' ||
		c === '\t' ||
		c === '\f' ||
		c === '\r'
	);
}

class Tokenizer {
	constructor( props ) {
		this.escapeBackslash = props.escapeBackslash;
		this.replaceEquations = props.escapeBackslash ? replaceAndEscapeEquations : replaceEquations;
	}

	setup( str ) {
		this.tokens = [];
		this._buffer = str;
		this._current = '';
		this._openTagEnd = null;
		this._endTagStart = null;
		this._state = IN_BASE;
		this._braceLevel = 0;
		this._level = 0;
		this.pos = 0;
		this.divHash = {};
	}

	_inBase( char ) {
		const pos = this.pos;
		if (
			char === '<' &&
			!isWhitespace( this._buffer.charAt( pos+1 ) ) && // Avoid mistaking smaller than sign in text as tag opening
			this._buffer.charAt( pos-1 ) !== '\\' // Allow escaping of left angle brackets
		) {
			debug( 'IN_BASE -> IN_OPENING_TAG_NAME' );
			this._state = IN_OPENING_TAG_NAME;
			this._level += 1;
			this._startTagNamePos = 0;
		}
		if ( this._state !== IN_BASE ) {
			// Exiting base state, push token:
			this.tokens.push( this._current );
			this._current = char;
		} else {
			this._current += char;
		}
	}

	_inAngleLink( char ) {
		this._current += char;
		if ( char === '>' ) {
			this._level -= 1;
			if ( this._level === 0 ) {
				debug( 'IN_ANGLE_LINK -> IN_BASE' );
				this._state = IN_BASE;
				const url = this._current.substring( this._startTagNamePos+1, this._current.length-1 );
				const before = this._current.substring( 0, this._startTagNamePos );
				const replacement = this.replaceEquations( md.renderInline( trim( before ) ) ) +
					' <a href="'+url+'">'+url+'</a>';
				this.divHash[ '<div id="placeholder_'+this.pos+'"/>' ] = replacement;
				this.tokens.push( '<div id="placeholder_'+this.pos+'"/>' );
				this._current = '';
			} else {
				debug( 'IN_ANGLE_LINK -> IN_BETWEEN_TAGS' );
				this._state = IN_BETWEEN_TAGS;
				const url = this._current.substring( this._startTagNamePos+1, this._current.length-1 );
				this._current = this._current.substring( 0, this._startTagNamePos ) +
				' ['+url+']('+url+')';
			}
		}
	}

	_inBetweenTags( char ) {
		this._current += char;
		if ( char === '<' && !isWhitespace( this._buffer.charAt( this.pos+1 ) ) ) {
			const text = this._current.substring( this._openTagEnd, this._current.length-1 );
			let replacement = this.replaceEquations( md.render( trimLineStarts( text ) ) );
			this._current = this._current.substring( 0, this._openTagEnd ) +
				replacement + '<';
			if ( this._buffer.charAt( this.pos+1 ) !== '/' ) {
				this._level += 1;
				debug( 'IN_BETWEEN_TAGS -> IN_OPENING_TAG_NAME' );
				this._state = IN_OPENING_TAG_NAME;
				this._startTagNamePos = this._current.length - 1;
			} else {
				this._endTagNewStart = this._current.length - 1;
				debug( 'IN_BETWEEN_TAGS -> IN_CLOSING_TAG' );
				this._state = IN_CLOSING_TAG;
			}
		}
	}

	_inClosingTag( char ) {
		this._current += char;
		if ( char === '>' ) {
			this._level -= 1;
			this._openTagEnd = this._current.length;
			this._endTagStart = null;
			if ( this._level === 0 ) {
				this.divHash[ '<div id="placeholder_'+this.pos+'"/>' ] = this._current;
				this.tokens.push( '<div id="placeholder_'+this.pos+'"/>' );
				this._current = '';
				debug( 'IN_CLOSING_TAG -> IN_BASE' );
				this._state = IN_BASE;
			} else {
				debug( 'IN_CLOSING_TAG -> IN_BETWEEN_TAGS' );
				this._state = IN_BETWEEN_TAGS;
			}
		}
	}

	_inOpeningTagName( char ) {
		this._current += char;
		if ( isWhitespace( char ) || this._buffer.charAt( this.pos+1 ) === '>' ) {
			debug( 'IN_OPENING_TAG_NAME -> IN_OPENING_TAG' );
			this._state = IN_OPENING_TAG;
		}
		else if ( char === '.' || char === ':' || char === '/' ) {
			debug( 'IN_OPENING_TAG_NAME -> IN_OPENING_TAG' );
			this._state = IN_ANGLE_LINK;
		}
	}

	_inOpeningTag( char ) {
		this._current += char;
		if ( char === '{' && this._buffer.charAt( this.pos-1 ) === '=' ) {
			this._JSX_ATTRIBUTE_START = this._current.length;
			this._braceLevel = 1;
			debug( 'IN_OPENING_TAG -> IN_JSX_ATTRIBUTE' );
			this._state = IN_JSX_ATTRIBUTE;
		}
		else if ( char === '>' ) {
			this._openTagEnd = this._current.length;
			if ( this._buffer.charAt( this.pos-1 ) === '/' ) {
				this._level -= 1;
				if ( this._level === 0 ) {
					this.divHash[ '<div id="placeholder_'+this.pos+'"/>' ] = this._current;
					this.tokens.push( '<div id="placeholder_'+this.pos+'"/>' );
					this._current = '';
					debug( 'IN_OPENING_TAG -> IN_BASE' );
					this._state = IN_BASE;
				} else {
					debug( 'IN_OPENING_TAG: IN_BETWEEN_TAGS' );
					this._state = IN_BETWEEN_TAGS;
				}
			} else {
				debug( 'IN_OPENING_TAG -> IN_BETWEEN_TAGS' );
				this._state = IN_BETWEEN_TAGS;
			}
		} else if ( isQuotationMark( char ) ) {
			this._stringOpener = char;
			debug( 'IN_OPENING_TAG -> IN_STRING_ATTRIBUTE' );
			this._state = IN_STRING_ATTRIBUTE;
		}
	}

	_inStringAttribute( char ) {
		this._current += char;
		if ( char === this._stringOpener && this._buffer.charAt( this.pos-1 ) !== '/' ) {
			debug( 'IN_STRING_ATTRIBUTE -> IN_OPENING_TAG' );
			this._state = IN_OPENING_TAG;
		}
	}

	_inJSXString( char ) {
		this._current += char;
		if ( char === '{' ) {
			this._braceLevel += 1;
		}
		else if ( char === '}' ) {
			this._braceLevel -= 1;
		}
		if ( this._braceLevel === 0 && this._buffer.charAt( this.pos-1 ) === '`' && char === '}' ) {
			debug( 'IN_JSX_STRING -> IN_OPENING_TAG' );
			this._state = IN_OPENING_TAG;
		}
	}

	_replaceInnerJSXExpressions() {
		const RE_OUTER_TAG = /<([^/>]+)[\s\S]*?>[\s\S]+?<\/\1>|<([\s\S]+?)\/>/g;
		let inner = this._current.substring( this._JSX_ATTRIBUTE_START );
		let match = RE_OUTER_TAG.exec( inner );
		while ( match !== null ) {
			const tokenizer = new Tokenizer({
				escapeBackslash: this.escapeBackslash
			});
			let replacement = tokenizer.parse( match[ 0 ] );
			inner = inner.substring( 0, match.index ) +
				replacement + inner.substring( match.index + match[0].length );
			match = RE_OUTER_TAG.exec( inner );
		}
		this._current = this._current.substring( 0, this._JSX_ATTRIBUTE_START ) + inner;
	}

	_inJSXObject( char ) {
		this._current += char;
		if ( char === '{' ) {
			this._braceLevel += 1;
		}
		else if ( char === '}' ) {
			this._braceLevel -= 1;
		}
		if ( this._braceLevel === 0 ) {
			debug( 'IN_JSX_OBJECT -> IN_OPENING_TAG' );
			this._replaceInnerJSXExpressions();
			this._state = IN_OPENING_TAG;
		}
	}

	_inJSXArray( char ) {
		this._current += char;
		if ( char === '{' ) {
			this._braceLevel += 1;
		}
		else if ( char === '}' ) {
			this._braceLevel -= 1;
		}
		if ( this._braceLevel === 0 && this._buffer.charAt( this.pos-1 ) === ']' && char === '}' ) {
			debug( 'IN_JSX_ARRAY -> IN_OPENING_TAG' );
			this._replaceInnerJSXExpressions();
			this._state = IN_OPENING_TAG;
		}
	}

	_inJSXOther( char ) {
		this._current += char;
		if ( char === '{' ) {
			this._braceLevel += 1;
		}
		else if ( char === '}' ) {
			this._braceLevel -= 1;
		}
		if ( this._braceLevel === 0 ) {
			debug( 'IN_JSX_OTHER -> IN_OPENING_TAG' );
			this._state = IN_OPENING_TAG;
		}
	}

	_inJSXExpression( char ) {
		this._current += char;
		if ( char === '{' ) {
			this._braceLevel += 1;
		}
		else if ( char === '}' ) {
			this._braceLevel -= 1;
		}
		if ( this._braceLevel === 0 ) {
			this._JSX_ATTRIBUTE_END = this._current.length;
			const inner = this._current.substring( this._JSX_ATTRIBUTE_START, this._JSX_ATTRIBUTE_END-1 );
			const tokenizer = new Tokenizer({
				escapeBackslash: this.escapeBackslash
			});
			let replacement = tokenizer.parse( inner );
			this._current = this._current.substring( 0, this._JSX_ATTRIBUTE_START ) +
				replacement + char;
			debug( 'IN_JSX_EXPRESSION -> IN_OPENING_TAG' );
			this._state = IN_OPENING_TAG;
		}
	}

	_inJSXAttribute( char ) {
		this._current += char;
		if ( char === '`' ) {
			debug( 'IN_JSX_ATTRIBUTE -> IN_JSX_STRING' );
			this._state = IN_JSX_STRING;
		}
		else if ( char === '{' ) {
			debug( 'IN_JSX_ATTRIBUTE -> IN_JSX_OBJECT' );
			this._state = IN_JSX_OBJECT;
		}
		else if ( char === '[' ) {
			debug( 'IN_JSX_ATTRIBUTE -> IN_JSX_ARRAY' );
			this._state = IN_JSX_ARRAY;
		}
		else if ( char === '<' ) {
			debug( 'IN_JSX_ATTRIBUTE -> IN_JSX_EXPRESSION' );
			this._state = IN_JSX_EXPRESSION;
		}
		else if ( !isWhitespace( char ) ) {
			debug( 'IN_JSX_ATTRIBUTE -> IN_JSX_OTHER' );
			this._state = IN_JSX_OTHER;
		}
	}

	parse( str ) {
		debug( 'Transform the following string: ' );
		debug( '---' );
		debug( str );
		debug( '---' );
		this.setup( str );
		for ( this.pos = 0; this.pos < str.length; this.pos++ ) {
			let char = str.charAt( this.pos );
			switch ( this._state ) {
			case IN_BASE:
				this._inBase( char );
				break;
			case IN_OPENING_TAG_NAME:
				this._inOpeningTagName( char );
				break;
			case IN_OPENING_TAG:
				this._inOpeningTag( char );
				break;
			case IN_CLOSING_TAG:
				this._inClosingTag( char );
				break;
			case IN_STRING_ATTRIBUTE:
				this._inStringAttribute( char );
				break;
			case IN_JSX_ATTRIBUTE:
				this._inJSXAttribute( char );
				break;
			case IN_JSX_STRING:
				this._inJSXString( char );
				break;
			case IN_JSX_OBJECT:
				this._inJSXObject( char );
				break;
			case IN_JSX_ARRAY:
				this._inJSXArray( char );
				break;
			case IN_JSX_EXPRESSION:
				this._inJSXExpression( char );
				break;
			case IN_JSX_OTHER:
				this._inJSXOther( char );
				break;
			case IN_BETWEEN_TAGS:
				this._inBetweenTags( char );
				break;
			case IN_ANGLE_LINK:
				this._inAngleLink( char );
				break;
			}
			if ( this.pos === str.length - 1 ) {
				debug( 'Remainder of input string: '+this._current );
				this.tokens.push( this._current );
			}
		}
		let out = this.tokens.join( '' );
		out = md.render( out );
		for ( let key in this.divHash ) {
			if ( hasOwnProp( this.divHash, key ) ) {
				out = out.replace( key, this.divHash[ key ]);
			}
		}
		debug( 'Processed string: ' );
		debug( '---' );
		debug( out );
		debug( '---' );
		return out;
	}
}


// EXPORTS //

export default Tokenizer;
