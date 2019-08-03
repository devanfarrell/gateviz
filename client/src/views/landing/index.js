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
			<Hero>
				<HeroPrimary>GateViz</HeroPrimary>
				<HeroSecondary>A combinational logic education tool</HeroSecondary>
			</Hero>
			<CircuitList circuitList={circuitList} />
		</LandingWrapper>
	);
};

const Hero = styled.div`
	padding-top: 50px;
	font-size: 1.5em;
	line-height: 0.8em;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const HeroPrimary = styled.h1`
	color: white;
`;

const HeroSecondary = styled.h2`
	color: white;
`;

const LandingWrapper = styled.div`
	width: 100%;
	height: 100vh;
	background: linear-gradient(to bottom right, #5ad4ee, #81d677);
`;

export default Landing;
