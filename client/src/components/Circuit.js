import React, { Component } from 'react';
import CircuitUI from './CircuitUI';
import { connect } from 'react-redux';
import { fetchCircuit, changeInputs } from '../actions';
import renderEngine from '../engines/renderEngine';



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
		this.props.renderCircuit(ref, this.props.circuit);
		//this.props.changeInputs({ circuit: this.props.circuit, inputs: [1, 1, 1], canvas: this.canvas });
		
	}
	
	renderCanvas() {
		if(this.props.canvas) {
            return this.props.canvas;
        }else{
            return null;
        }
	}
	


	render() {
		// if the circuit has not been fetched
		console.log(this.props);
		if (!this.props.circuit) {
			return <div> Loading Circuit!!!! </div>;
		}
		// if the circuit has been built
		else {
			console.log(this.props)
			return (
				<div>
					<CircuitUI name={this.props.circuit.name}/>
					<div ref={ref => this.startRenderEngine(ref)} className="circuitCanvas" />
				</div>
			)
		}
	}
}

function mapStateToProps({ circuit }, ownprops) {
	var renderCircuit = null;
	if(circuit){
		renderCircuit = (div, circuit) => renderEngine(div, circuit);
	}
	return { circuit, renderCircuit };
}

export default connect(
	mapStateToProps,
	{ fetchCircuit, changeInputs }
)(Circuit);