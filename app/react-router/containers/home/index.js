import React from 'react';
import SnackbarGenerator from '../../../../src/index.js';

const Snackbar = SnackbarGenerator({
	directionFrom: `bottom`,
	closeLabel: `Close`,
	duration: .75,
	router: 'react-router',
});

export default class Container extends React.Component {
	constructor(props) {
		super(props);
		this.$snackbar = new Snackbar(this.props.history);
	}
	componentWillMount() {
	}
	componentDidMount() {
	}
	handleFlash() {
		let messageInput = document.querySelector(`#messageInput`);
		this.$snackbar.flash(messageInput.value ? messageInput.value : "Hello world!");
	}
	handleRedirect() {
		let paramInput = document.querySelector('#paramInput');
		let path = `/react-router/redirect/${paramInput.value}`;
		this.$snackbar.flash(`Redirect to: "redirect" state with id=${paramInput.value}`, path);
	}
	render() {
		return (
			<section>
				<h1>Snackbar with React Router</h1>
				<div id='flash'>
					<input id='messageInput' type='text'/>
					<button onClick={()=>this.handleFlash()}>Click me!</button>
				</div>
				<div id='redirect'>
					<input id='paramInput' type='text'/>
					<button onClick={()=>this.handleRedirect()}>Test redirect()</button>
				</div>
			</section>
		);
	}
}
