import React from 'react';
import ReactDOM from 'react-dom';

import {Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './containers/home';
import RedirectPage from './containers/redirect';

const App = ()=>{
	return (
		<Switch>
			<Route exact path='/react-router' component={Home}/>
			<Route path='/react-router/redirect/:id' component={RedirectPage}/>
		</Switch>
	);
}

ReactDOM.render(
	<BrowserRouter>
		<App/>
	</BrowserRouter>
	, document.getElementById('app')
);
