import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import CircuitList from './circuitlist';
import { fetchCircuitListRequest } from 'redux/circuitlist/actions';
import { selectCircuitList } from 'redux/circuitlist/selectors';
import styled from '@emotion/styled';

const Landing = props => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCircuitListRequest());
	}, [dispatch]);
	const circuitList = useSelector(selectCircuitList, shallowEqual);

	return (
		<LandingWrapper>
			<div className="hero centerallthethings">
				<h1 className="heroPrimary"> GateViz </h1>
				<h2 className="heroSecondary"> a combinational logic education tool </h2>
			</div>
			{/* <SearchBar /> */}
			<CircuitList circuitList={circuitList} />
		</LandingWrapper>
	);
};

const LandingWrapper = styled.div`
	width: 100%;
	height: 100vh;
	background: linear-gradient(to bottom right, #5ad4ee, #81d677);
`;

export default Landing;
