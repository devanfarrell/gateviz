import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCircuit, changeInputs } from '../actions';
import * as renderEngine from '../engines/renderEngine';


class Circuit extends Component {
	constructor(props) {
		super(props);
		this.canvas = this.refs.ref;
	}

	componentDidMount() {
		var uid = this.props.location.pathname
		this.props.fetchCircuit(uid.replace("/circuit/", ""));
	}

	startRenderEngine(ref) {
		this.canvas = renderEngine.initialize(ref);
		renderEngine.render(this.canvas, this.props.circuit);
		this.props.changeInputs({circuit: this.props.circuit, inputs: [1, 1, 1], canvas: this.canvas});
		renderEngine.render(this.canvas, this.props.circuit, this.internalCircuitclickEvent);
	}


	render() {
		// if the circuit has not been fetched
		if (!this.props.circuit) {
			return <div> Loading Circuit!!!! </div>;
		}
		// if the circuit has been built
		else {
			return <div ref={ref => this.startRenderEngine(ref) } className="circuitCanvas"/>
		}
	}
}

function mapStateToProps({ circuit, breadCrumb }, ownprops) {
	return { circuit, breadCrumb };
}

export default connect(
	mapStateToProps,
	{ fetchCircuit, changeInputs }
)(Circuit);