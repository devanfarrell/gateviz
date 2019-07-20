import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Canvas from './canvas';
import { fetchCircuitRequest } from 'redux/circuit/actions';
import styled from '@emotion/styled';

const CircuitView = props => {
	const dispatch = useDispatch();
	useEffect(() => {
		const cid = props.match.params.cid;
		dispatch(fetchCircuitRequest(cid));
	}, [dispatch, props.match.params.cid]);

	return (
		<UI>
			<Canvas />
		</UI>
	);
};

const UI = styled.div`
	display: flex;
	flex: 1 1 auto;
	position: relative;
`;

export default CircuitView;
