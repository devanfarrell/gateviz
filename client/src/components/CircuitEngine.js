import React, { Component } from 'react';
import buildCircuit from '../engines/buildEngine';
import svgjs from 'svgjs';

class CircuitEngine extends Component {
	// Maybe make this whole JSON file smarter. Make the id's actually designate the location and index
	// consistently rather than assume that they are arbitrary.
	// This will allow for smaller circuit size at each level and simplier logic
	// constructing a new circuit will be more difficult but everything else can be done much quicker
	// deserializing can be a step of making more accessable properies so that less actions need be
	// performed on them after the initial build stage.

	//currently, I am getting reference data though so maybe this is good enough and not too many assumptions should be made

	constructor(props) {
		super(props);
		this.state = {
			svgPanel: null,
			builtCircuit: null
		};
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
		if (!this.state.builtCircuit && this.props.circuitData) {
			buildCircuit(this.props.circuitData);
		}
		return <div ref={ref => (this.canvas = ref)} />;
	}
}

export default CircuitEngine;
