import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCircuit } from '../actions';


class Circuit extends Component {

	componentDidMount() {
		this.props.fetchCircuit();
	}

	render() {

		// if the circuit has not been fetched
		if (!this.props.circuit) {
			return <div> Loading Circuit!!!! </div>
		}
		// if the circuit has been built
		else {
			//console.log(this.props.circuit.internalLogic[1]);
			var test = this.props.circuit.internalLogic[1].evaluate([true, true]);
			console.log(test);
			return <div ref={ref => (this.canvas = ref)} className="circuitCanvas" />;
		}
	}
}

function mapStateToProps({ circuit, builtCircuit }, ownprops) {
	return { circuit, builtCircuit };
}

export default connect(
	mapStateToProps,
	{ fetchCircuit }
)(Circuit);
