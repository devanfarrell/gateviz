import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Canvas from './canvas';
import { fetchCircuitRequest } from 'redux/circuit/actions';

const CircuitView = props => {
	const dispatch = useDispatch();
	useEffect(() => {
		const cid = props.match.params.cid;
		dispatch(fetchCircuitRequest(cid));
	}, []);

	return (
		<div className="UI">
			<Canvas />
		</div>
	);
};

export default CircuitView;
