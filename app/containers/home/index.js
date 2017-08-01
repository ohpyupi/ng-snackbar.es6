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
	handleClick() {
		let messageInput = document.querySelector(`#messageInput`);
		this.$snackbar.flash(messageInput.value ? messageInput.value : "Hello world!");
	}
	render() {
		return (
			<section>
				<input id='messageInput' type='text'/>
				<button onClick={()=>this.handleClick()}>Click me!</button>
			</section>
		);
	}
}
