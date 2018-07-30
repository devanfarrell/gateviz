import React, { Component } from 'react';
//import svgjs from 'svgjs';
import { connect } from 'react-redux';
import { fetchCircuit } from '../actions';
import buildCircuit from '../engines/buildEngine';

class Circuit extends Component {

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
			builtCircuit: null
		};
	}

	componentDidMount() {
        this.props.fetchCircuit();
	}

	onCircuitFetch(){
		var temp = buildCircuit(this.props.circuit)
		this.setState({ builtCircuit: temp });
	}

	render() {
		// if the circuit has been fetched but not built
		if (!this.state.builtCircuit && this.props.circuit) {
			
			return <div onClick={this.onCircuitFetch()} > building!!!! </div>
		} 
		// if the circuit has not been fetched
		else if(!this.props.circuit) {
			return <div> fetching!!!! </div>
		}
		// if the circuit has been built
		else {
			return <div> Displaying! </div> 
		}

		return <div ref={ref => (this.canvas = ref)} className="circuitCanvas"/>;
	}
}

function mapStateToProps({ circuit }, ownprops) {
	return { circuit };
}

export default connect(
	mapStateToProps,
	{ fetchCircuit }
)(Circuit);
