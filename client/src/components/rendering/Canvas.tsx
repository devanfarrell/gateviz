import * as React from 'react';
import * as renderEngine from './renderEngine';

interface CanvasProps {
    breadcrumbs: any
    circuit: any
};

export default class Canvas extends React.PureComponent<CanvasProps>{
	private canvas: any;
    constructor(props) {
		super(props);
		this.canvas = this.refs.ref;
		this.startRenderEngine = this.startRenderEngine.bind(this)
	}
    
    public startRenderEngine(ref) {
        if(!this.canvas) {
            this.canvas = renderEngine.initialize(ref);
		}
		renderEngine.render(this.canvas, this.props.circuit, this.props.breadcrumbs);
	}

    public render() {
		// if the circuit has not been fetched
		if (!this.props.circuit || !this.props.breadcrumbs) {
			return (<div> Loading Circuit!!!! </div>);
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
