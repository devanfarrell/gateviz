import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import CircuitList from './circuitlist';
// import SearchBar from './Search_Bar';
import { fetchCircuitListRequest } from 'redux/circuitlist/actions';
import { selectCircuitList } from 'redux/circuitlist/selectors';

const Landing = props => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCircuitListRequest());
	}, [dispatch]);
	const circuitList = useSelector(selectCircuitList, shallowEqual);
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

export default Landing;
