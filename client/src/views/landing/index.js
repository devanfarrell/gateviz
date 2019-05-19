import React from 'react';
import CircuitList from './circuitlist';
// import SearchBar from './Search_Bar';
import { connect } from 'react-redux';
import { selectCircuitList } from 'redux/circuitlist/selectors';

const Landing = ({ circuitList }) => {
	return (
		<div id="landing">
			<div className="hero centerallthethings">
				<h1 className="heroPrimary"> GateViz </h1>
				<h2 className="heroSecondary"> a combinational logic education tool </h2>
			</div>
			{/* <SearchBar /> */}
			<CircuitList circuitList={circuitList} />
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
