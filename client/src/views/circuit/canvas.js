import React, { PureComponent } from 'react';
import styled from '@emotion/styled';
import * as renderEngine from './renderer';
import { connect } from 'react-redux';
import { selectParsedCircuit } from 'redux/circuit/selectors';
import { selectBreadcrumbs } from 'redux/breadcrumbs/selectors';

class Canvas extends PureComponent {
	constructor(props) {
		super(props);
		this.canvas = this.refs.ref;
	}

	startRenderEngine = ref => {
		if (!this.canvas) {
			this.canvas = renderEngine.initialize(ref);
		}
		renderEngine.render(this.canvas, this.props.circuit, this.props.breadcrumbs);
	};

	render() {
		// if the circuit has not been fetched
		if (!this.props.circuit || !this.props.breadcrumbs) {
			return <div> Loading Circuit!!!! </div>;
		}
		// if the circuit has been built
		else {
			return <CircuitCanvas ref={ref => this.startRenderEngine(ref)} />;
		}
	}
}

const CircuitCanvas = styled.div`
	width: 100%;
	height: 100%;
`;

const mapState = state => ({
	circuit: selectParsedCircuit(state),
	breadcrumbs: selectBreadcrumbs(state)
});

export default connect(
	mapState,
	null
)(Canvas);
