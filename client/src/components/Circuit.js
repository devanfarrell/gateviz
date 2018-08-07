import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCircuit, stepIntoCircuit, changeInputs } from '../actions';
import * as renderEngine from '../engines/renderEngine';

/*
* Possible strategy for fixing rerender issues:
* Have an inialize SVG in the rendering engine which passes back a reference to the SVG canvas.
* This function should be called before fetch circuitin the componentDidMount.
* That reference will get passed along with the action fetchCircuit and whenever else the circuit needs to be rendered.
* Not sure this will work but if it does it'll probably be the cleanest method possible.
* Rerenders will probably force clear everything from the canvas unless references are able to be maintained
* and may cause of leak of event listeners.
*/

class Circuit extends Component {
	constructor(props) {
		super(props);
		this.internalCircuitclickEvent = this.internalCircuitclickEvent.bind(this); 
		this.canvas = this.refs.ref;
	}

	componentDidMount() {
		this.props.fetchCircuit();
	}


	startRenderEngine(ref) {
		this.canvas = renderEngine.initialize(ref);
		renderEngine.render(this.canvas, this.props.circuit, this.internalCircuitclickEvent);
	}
	
	internalCircuitclickEvent(data) {	
		var temp = {circuit: this.props.circuit, data}
		// Temporary test for changeInput action
		this.props.changeInputs({circuit: this.props.circuit, inputs: [1, 1, 1], canvas: this.canvas});
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
			return <div ref={ref => this.startRenderEngine(ref) } className="circuitCanvas"/>
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