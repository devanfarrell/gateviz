import React, { Component } from 'react';
// import CircuitList from './Circuit_List';
// import SearchBar from './Search_Bar';
import { connect } from 'react-redux';
import { selectCircuitList } from 'redux/circuitlist/selectors';

const Landing = props => {
	console.debug(props);
	return (
		<div className="landing container">
			<div className="hero centerallthethings">
				<h1 className="heroPrimary"> GateViz </h1>
				<h2 className="heroSecondary"> a combinational logic education tool </h2>
			</div>
			{/* <SearchBar /> */}
			{/* <CircuitList circuitList={props.circuitList} /> */}
		</div>
	);
};

const mapState = state => ({
	circuitList: selectCircuitList(state)
});

export default connect(
	mapState,
	null
)(Landing);
