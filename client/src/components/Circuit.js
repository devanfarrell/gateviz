import React, { Component } from 'react';
import svgjs from 'svgjs';
import { connect } from 'react-redux';
import { fetchCircuit } from '../actions';
import CircuitEngine from './CircuitEngine';

class Circuit extends Component {
	componentDidMount() {
        this.props.fetchCircuit();
	}

	render() {
		return (
			<div className="circuitCanvas">
				<CircuitEngine circuitData={this.props.circuit}/>
			</div>
		);
	}
}

function mapStateToProps({ circuit }, ownprops) {
	return { circuit };
}

export default connect(
	mapStateToProps,
	{ fetchCircuit }
)(Circuit);
