import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCircuit, stepIntoCircuit, changeInputs } from '../actions';
import renderEngine from '../engines/renderEngine';

class Circuit extends Component {
	constructor(props) {
		super(props);
		this.internalCircuitclickEvent = this.internalCircuitclickEvent.bind(this);
		this.state = {circuit: {}};
	}

	componentDidMount() {
		this.props.fetchCircuit();
	}

	internalCircuitclickEvent(data) {
		
		
		var temp = {circuit: this.props.circuit, data}
		// Temporary test for changeInput action
		this.props.changeInputs({circuit: this.props.circuit, inputs: [1, 1, 1]});
		this.setState({circuit: this.props.circuit});
		//this.props.stepIntoCircuit(temp);
	}
	render() {
		console.log(this.props.circuit)
		// if the circuit has not been fetched
		if (!this.props.circuit) {
			return <div> Loading Circuit!!!! </div>;
		}
		// if the circuit has been built
		else {
			return <div ref={ref => (console.log(this.props), renderEngine(ref, this.props.circuit, this.internalCircuitclickEvent ), console.log('called')) } className="circuitCanvas"/>
		}
	}
}

function mapStateToProps({ circuit, builtCircuit }, ownprops) {
	return { circuit, builtCircuit };
}

export default connect(
	mapStateToProps,
	{ fetchCircuit, stepIntoCircuit, changeInputs }
)(Circuit);
