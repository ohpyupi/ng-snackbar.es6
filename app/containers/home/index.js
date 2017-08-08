import React from 'react';
import SnackbarGenerator from '../../../src/index.js';

const Snackbar = SnackbarGenerator({
	directionFrom: `bottom`,
	closeLabel: `Close`,
	duration: .75,
});

export default class Container extends React.Component {
	constructor(props) {
		super(props);
		this.$snackbar = new Snackbar(this.props.transition.router.stateService);
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
		this.$snackbar.redirect('redirect', {
			id: paramInput.value,
		});
	}
	render() {
		return (
			<section>
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
