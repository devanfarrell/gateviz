import React, { Component } from 'react';
import svgjs from 'svgjs';

class CircuitEngine extends Component {
	constructor(props) {
		super(props);
		this.state = {
			svgPanel: null,
			builtCircuit: null
		};
	}

	parseCircuitData() {
		var tempCircuit = {};
		//Handle inputs
		tempCircuit.inputs = [];
		for (var i = 0; i < this.props.circuitData.inputs.length; i++) {
			tempCircuit.inputs[i] = this.props.circuitData.inputs[i];
			tempCircuit.inputs[i].state = false;
		}

		console.log(tempCircuit);
	}

	componentDidMount() {
		//if the panel hasn't been defined
		if (!this.state.svgPanel) {
			// This might be a huge bug...
			const svgPanel = svgjs(this.canvas).size(1000, 1500);
			this.setState({ svgPanel: svgPanel, builtCircuit: null });
		}

        // if a built circuit is not defined and circuitData has been received

	}

	render() {
        
		if (!this.state.builtCircuit && this.props.circuitData ) {
			this.parseCircuitData();
		}
		return <div ref={ref => (this.canvas = ref)} />;
	}
}

export default CircuitEngine;
