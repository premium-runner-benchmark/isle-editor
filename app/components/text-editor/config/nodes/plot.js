// MODULES //

import { getImageAttrs } from './image.js';


// MAIN //

const plotSpec = {
	attrs: {
		src: {},
		plotID: { default: null },
		align: { default: null },
		alt: { default: null },
		crop: { default: null },
		title: { default: null },
		meta: { default: null },
		width: { default: '550px' },
		height: { default: null },
		rotate: { default: null }
	},
	inline: false,
	group: 'block',
	draggable: true,
	toDOM: node => {
		return [ 'span',
			{
				class: 'img-container',
				'data-plot-id': node.attrs.plotID
			},
			[ 'img',
				{
					src: node.attrs.src,
					align: node.attrs.align,
					alt: node.attrs.alt,
					crop: node.attrs.crop,
					title: node.attrs.title,
					width: node.attrs.width,
					height: node.attrs.height,
					rotate: node.attrs.rotate
				}
			],
			[ 'pre',
				{
					class: 'img-tooltip'
				},
				node.attrs.meta
			]
		];
	},
	parseDOM: [{
		priority: 51,
		tag: 'img[data-plot-id]',
		getAttrs: dom => {
			const attrs = getImageAttrs( dom );
			const plotID = dom.getAttribute( 'data-plot-id' );
			const meta = dom.getAttribute( 'data-plot-meta' );
			return { ...attrs, meta, plotID };
		}
	}]
};


// EXPORTS //

export default plotSpec;
