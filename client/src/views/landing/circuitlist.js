import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const CircuitList = ({ circuitList }) => {
	return (
		<>
			{circuitList.map(circuit => (
				<CircuitCard
					name={circuit.name}
					description={circuit.description}
					key={circuit.cid}
					cid={circuit.cid}
				/>
			))}
		</>
	);
};

const CircuitCard = props => {
	return (
		<CircuitCardWapper>
			<Link to={`circuit/${props.cid}`}>
				<div className="title">{props.name}</div>
				<div className="description">{props.description}</div>
			</Link>
		</CircuitCardWapper>
	);
};

const CircuitCardWapper = styled.div`
	display: inline-flex;
	width: 280px;
	height: 280px;
	padding: 10px;
	background-color: white;
	border-radius: 5px;
	margin: 10px;
`;

export default CircuitList;
