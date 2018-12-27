import React, { Component } from 'react';
import CircuitUI from './UI/CircuitUI';
import Canvas from './rendering/Canvas';
import { connect } from 'react-redux';
import { fetchCircuit, changeInputs } from '../redux/actions';



class Circuit extends Component {
	constructor(props) {
		super(props);
		this.canvas = this.refs.ref;
	}

	componentDidMount() {
		var uid = this.props.location.pathname
		this.props.fetchCircuit(uid.replace("/circuit/", ""));
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
		if (!this.props.circuit) {
			return <div> Loading Circuit!!!! </div>;
		}
		// if the circuit has been built
		else {
			return (
				<div className="UI">
					<CircuitUI name={this.props.circuit.name}/>
					<div className="canvas">
						{this.renderCanvas()}
					</div>
				</div>
			)
		}
	}
}

function mapStateToProps({ circuit, breadcrumbs }, ownprops) {
	var div = null
	if(circuit){
		div = <Canvas circuit={circuit} breadcrumbs={breadcrumbs}/>;
	}
	return { circuit, canvas: div };
}

export default connect(
	mapStateToProps,
	{ fetchCircuit, changeInputs }
)(Circuit);