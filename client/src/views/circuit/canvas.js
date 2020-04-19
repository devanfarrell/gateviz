import React, { PureComponent } from 'react';
import styled from '@emotion/styled';
import renderCircuit from './renderer';
import { connect } from 'react-redux';
import { selectCircuit } from 'redux/circuit/selectors';
import { selectBreadcrumbs } from 'redux/slices/breadcrumbs';
import colors from 'styles/colors';
import * as svgjs from 'svgjs';

class Canvas extends PureComponent {
	constructor(props) {
		super(props);
		this.canvas = this.refs.ref;
	}

	startRenderEngine = ref => {
		if (!this.canvas) {
			this.canvas = svgjs(ref).viewbox({ x: 0, y: 0, width: 800, height: 800 });
		}
		renderCircuit(this.canvas, this.props.circuit, this.props.breadcrumbs);
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
	background-color: ${colors.grey.extraLight};

	svg {
		width: 100%;
		height: 100%;
	}
`;

const mapState = state => ({
	circuit: selectCircuit(state),
	breadcrumbs: selectBreadcrumbs(state)
});

export default connect(
	mapState,
	null
)(Canvas);
