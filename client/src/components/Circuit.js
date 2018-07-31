import React, { Component } from 'react';
//import svgjs from 'svgjs';
import { connect } from 'react-redux';
import { fetchCircuit, setBuiltCircuit } from '../actions';
import buildCircuit from '../engines/buildEngine';

class Circuit extends Component {

	// Maybe make this whole JSON file smarter. Make the id's actually designate the location and index
	// consistently rather than assume that they are arbitrary.
	// This will allow for smaller circuit size at each level and simplier logic
	// constructing a new circuit will be more difficult but everything else can be done much quicker
	// deserializing can be a step of making more accessable properies so that less actions need be
	// performed on them after the initial build stage.

	//currently, I am getting reference data though so maybe this is good enough and not too many assumptions should be made

	componentDidMount() {
		this.props.fetchCircuit();
		console.log(this.props);
	}

	onCircuitFetch(){
		var temp = buildCircuit(this.props.circuit)
		this.props.setBuiltCircuit(temp);
	}

	render() {
		console.log(this.props.builtCircuit)
		// if the circuit has been fetched but not built
		if (!this.props.builtCircuit && this.props.circuit) {
			
			return <div onClick={this.onCircuitFetch()} > building!!!! </div>
		} 
		// if the circuit has not been fetched
		else if(!this.props.circuit) {
			return <div> fetching!!!! </div>
		}
		// if the circuit has been built
		else {
			return <div ref={ref => (this.canvas = ref)} className="circuitCanvas"/>;
		}
	}
}

function mapStateToProps({ circuit, builtCircuit }, ownprops) {
	return { circuit, builtCircuit };
}

export default connect(
	mapStateToProps,
	{ fetchCircuit, setBuiltCircuit }
)(Circuit);
