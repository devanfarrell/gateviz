import React, { Component } from 'react';
// import CircuitUI from './UI/CircuitUI';
// import Canvas from './rendering/Canvas';
import { connect } from 'react-redux';
import { fetchCircuit } from 'redux/circuit/actions';
import { actionTypes } from 'redux/utils';

class Circuit extends Component {
	constructor(props) {
		super(props);
		this.canvas = this.refs.ref;
	}

	componentDidMount() {
		const cid = this.props.match.params.cid;
		this.props.fetchCircuit(actionTypes.REQUEST, cid);
	}

	renderCanvas() {
		if (this.props.canvas) {
			return this.props.canvas;
		} else {
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
					<span>YOOOO</span>
					{/* <CircuitUI name={this.props.circuit.name} />
					<div className="canvas">{this.renderCanvas()}</div> */}
				</div>
			);
		}
	}
}

// const mapState = ({ circuit, breadcrumbs }) => {
// 	let div = null;
// 	if (circuit) {
// 		div = <Canvas circuit={circuit} breadcrumbs={breadcrumbs} />;
// 	}
// 	return { circuit, canvas: div };
// };

export default connect(
	null,
	{ fetchCircuit }
)(Circuit);
