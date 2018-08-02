import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCircuit } from '../actions';
import renderEngine from '../engines/renderEngine';

class Circuit extends Component {
	constructor(props) {
		super(props);
		this.canvas = React.createRef();
	}

	componentDidMount() {
		this.props.fetchCircuit();
	}

	render() {

		// if the circuit has not been fetched
		if (!this.props.circuit) {
			return <div> Loading Circuit!!!! </div>;
		}
		// if the circuit has been built
		else {
			return <div ref={ref => (renderEngine(ref, this.props.circuit))} />
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
