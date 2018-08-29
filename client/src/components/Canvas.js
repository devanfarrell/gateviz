import React, { Component } from 'react';
import * as renderEngine from '../engines/renderEngine';

export default class Canvas extends Component {
    constructor(props) {
		super(props);
        this.canvas = this.refs.ref;
	}
    
    startRenderEngine(ref) {
        if(!this.canvas) {
            this.canvas = renderEngine.initialize(ref);
        }
		renderEngine.render(this.canvas, this.props.circuit.circuit);
	}

    render() {
		// if the circuit has not been fetched
		if (!this.props.circuit.circuit) {
			return <div> Loading Circuit!!!! </div>;
		}
		// if the circuit has been built
		else {
			return (
				<div>
					<div ref={ref => this.startRenderEngine(ref)} className="circuitCanvas" />
				</div>
			)
		}
	}
}
