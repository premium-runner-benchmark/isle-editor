// MODULES //

import Loadable from 'components/internal/loadable';


// MAIN //

const Gate = Loadable( () => import( /* webpackChunkName: "Gate" */ './main.js' ) );


// EXPORTS //

export default Gate;
