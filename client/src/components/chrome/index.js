import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import colors from 'styles/colors';

const Chrome = props => {
	return (
		<Drawer>
			<ProjectName to="/">GateViz</ProjectName>
			<Line />
			{props.children}
		</Drawer>
	);
};

const Drawer = styled.div`
	width: 500px;
	display: flex;
	flex: 0 1 auto;
	background-color: ${colors.grey.veryDark};
	color: ${colors.grey.veryLight};
	flex-direction: column;
	overflow-y: auto;
`;

const Line = styled.div`
	width: 420px;
	height: 2px;
	background: ${colors.grey.extraLight};
`;

const ProjectName = styled(Link)`
	color: ${colors.grey.extraLight};
	text-decoration: none;
	font-size: 24px;
	margin-top: 15px;
	margin-left: 20px;
	margin-bottom: 2px;
`;
export default Chrome;
