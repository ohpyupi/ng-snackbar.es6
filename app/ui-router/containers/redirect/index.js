import React from 'react';

export default class Container extends React.Component {
	constructor(props) {
		super(props);
		this.$stateParamsArr = [];
	}
	componentWillMount() {
		let $stateParams = this.props.resolves.$stateParams;
		Object.keys($stateParams).forEach(keyName=>{
			let param = {};
			param.key = keyName;
			param.value = $stateParams[keyName];
			this.$stateParamsArr.push(param);
		});
	}
	componentDidMount() {
	}
	render() {
		return (
			<section>
				<h3>Redirect Container</h3>
				<p>State parameters</p>
				{this.$stateParamsArr.map((param, idx)=>
					<div key={idx}>{param.key}: {param.value}
				</div>)}
			</section>
		);
	}
}
