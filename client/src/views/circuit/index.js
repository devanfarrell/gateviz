import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Canvas from './canvas';
import { fetchCircuitRequest } from 'redux/circuit/actions';
import styled from '@emotion/styled';
import Chrome from 'components/chrome';
import Card from 'components/card';
import Inputs from './inputs';
import Breadcrumbs from './breadcrumbs';

const CircuitView = props => {
	const dispatch = useDispatch();
	useEffect(() => {
		const cid = props.match.params.cid;
		dispatch(fetchCircuitRequest(cid));
	}, [dispatch, props.match.params.cid]);

	return (
		<>
			<Chrome>
				<Card title="Inputs">
					<Inputs />
				</Card>
				<Card title="Traversal">
					<Breadcrumbs />
				</Card>
			</Chrome>
			<UI>
				<Canvas />
			</UI>
		</>
	);
};

const UI = styled.div`
	display: flex;
	flex: 1 1 auto;
	position: relative;
`;

export default CircuitView;
