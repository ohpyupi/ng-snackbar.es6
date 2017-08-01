import {UIRouterReact, servicesPlugin, pushStateLocationPlugin} from '@uirouter/react';

import Home from './containers/home';

let router = new UIRouterReact();
router.plugin(servicesPlugin);
router.plugin(pushStateLocationPlugin);

let states = [
	{
		name: 'home',
		url: '/',
		component: Home,
		onEnter: (trans, state)=>{
		},
	},
];

router.urlRouter.otherwise("/");

for (let i = 0; i < states.length; i++) {
	let state = states[i];
	router.stateRegistry.register(state);
}

export default router;
