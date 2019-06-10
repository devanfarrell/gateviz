import React from 'react';
import { Link } from 'react-router-dom';

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
		<div className="circuit-card">
			<Link to={`circuit/${props.cid}`}>
				<div className="title">{props.name}</div>
				<div className="description">{props.description}</div>
			</Link>
		</div>
	);
};

export default CircuitList;
