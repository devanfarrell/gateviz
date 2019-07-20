import React, { useState } from 'react';
import posed from 'react-pose';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import Toggle from 'components/toggle';

const expanded = 'expanded';
const condensed = 'condensed';

const Chrome = props => {
	const [expandedState, setExpanded] = useState(false);
	const stateString = expandedState ? expanded : condensed;
	return (
		<Drawer
			pose={stateString}
			onClick={!expandedState ? () => setExpanded(true) : () => setExpanded(false)}
		>
			<ProjectName to="/">GateViz</ProjectName>
			<Line pose={stateString} />
			<Toggle
				id="bob"
				onChange={() => {
					console.debug('you did so good!');
				}}
				handleToggle={() => {
					console.debug('you did so good!');
				}}
			/>
		</Drawer>
	);
};

const DrawerPosedDiv = posed.div({
	[expanded]: { width: '500px' },
	[condensed]: { width: '115px' }
});

const Drawer = styled(DrawerPosedDiv)`
	display: flex;
	background-color: ${colors.grey.veryDark};
	color: ${colors.grey.veryLight};
	flex-direction: column;
`;

const LinePosed = posed.line({
	[expanded]: { width: '420px' },
	[condensed]: { width: '115px' }
});

const Line = styled(LinePosed)`
	height: 2px;
	background: ${colors.grey.light};
`;

const ProjectName = styled(Link)`
	color: ${colors.grey.light};
	text-decoration: none;
	font-size: 24px;
	margin-top: 15px;
	margin-left: 20px;
	margin-bottom: 2px;
`;
export default Chrome;
