import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import colors from 'styles/colors';

const CircuitList = ({ circuitList }) => {
	return (
		<Table>
			<TableRow margin="2px">
				<TableName backgroundColor="white">Name</TableName>
				<TableDescription backgroundColor="white">Description</TableDescription>
			</TableRow>
			{circuitList.map((circuit, i) => (
				<TableRow key={circuit.cid}>
					<TableName backgroundColor={i % 2 === 1 ? 'white' : colors.grey.extraLight}>
						<Link to={`/circuit/${circuit.cid}`}>{circuit.name}</Link>
					</TableName>
					<TableDescription backgroundColor={i % 2 === 1 ? 'white' : colors.grey.extraLight}>
						{circuit.description}
					</TableDescription>
				</TableRow>
			))}
		</Table>
	);
};

const Table = styled.div`
	display: flex;
	flex-direction: column;
`;

const TableRow = styled.div(props => ({
	display: 'flex',
	flexDirection: 'row',
	width: '90%',
	margin: '0 auto',
	marginBottom: props.margin
}));

const TableName = styled.div(props => ({
	marginRight: '2px',
	backgroundColor: props.backgroundColor,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '250px',
	fontSize: '18px',
	fontWeight: 'light',
	padding: '5px',

	a: {
		color: colors.grey.veryDark,
		fontWeight: 'light'
	}
}));

const TableDescription = styled.div(props => ({
	flex: '1 1 auto',
	backgroundColor: props.backgroundColor,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: '18px',
	fontWeight: 'light',
	padding: '5px',
	color: colors.grey.veryDark
}));

export default CircuitList;
