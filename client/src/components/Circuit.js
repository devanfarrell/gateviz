import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCircuit, stepIntoCircuit } from '../actions';
import renderEngine from '../engines/renderEngine';

class Circuit extends Component {
	constructor(props) {
		super(props);
		this.internalCircuitclickEvent = this.internalCircuitclickEvent.bind(this);
	}

	componentDidMount() {
		this.props.fetchCircuit();
	}

	internalCircuitclickEvent(data) {
		this.props.stepIntoCircuit(data);
	}
	render() {

		// if the circuit has not been fetched
		if (!this.props.circuit) {
			return <div> Loading Circuit!!!! </div>;
		}
		// if the circuit has been built
		else {
			return <div ref={ref => (renderEngine(ref, this.props.circuit, this.internalCircuitclickEvent )) } className="circuitCanvas"/>
		}
	}
}

function mapStateToProps({ circuit, builtCircuit }, ownprops) {
	return { circuit, builtCircuit };
}

export default connect(
	mapStateToProps,
	{ fetchCircuit, stepIntoCircuit }
)(Circuit);
