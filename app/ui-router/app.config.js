import {UIRouterReact, servicesPlugin, pushStateLocationPlugin} from '@uirouter/react';

import Home from './containers/home';
import Redirect from './containers/redirect';

let router = new UIRouterReact();
router.plugin(servicesPlugin);
router.plugin(pushStateLocationPlugin);

let states = [
	{
		name: 'home',
		url: '/ui-router',
		component: Home,
		onEnter: (trans, state)=>{
		},
	},
	{
		name: 'redirect',
		url: '/ui-router/redirect/:id',
		component: Redirect,
		onEnter: (trans, state)=>{
		},
	},
];

router.urlRouter.otherwise("/ui-router");

for (let i = 0; i < states.length; i++) {
	let state = states[i];
	router.stateRegistry.register(state);
}

export default router;
