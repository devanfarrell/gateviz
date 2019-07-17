import React, { useState } from 'react';
import posed from 'react-pose';
import { Link } from 'react-router-dom';
import Inputs from './inputs';

const expanded = 'expanded';
const condensed = 'condensed';

const Drawer = posed.div({
	[expanded]: { width: '500px' },
	[condensed]: { width: '115px' }
});
const Line = posed.line({
	[expanded]: { width: '420px', height: '2px', background: '#969697' },
	[condensed]: { width: '100px', height: '2px', background: '#969697' }
});

const Chrome = props => {
	const [expandedState, setExpanded] = useState(false);
	const stateString = expandedState ? expanded : condensed;
	return (
		<Drawer
			pose={stateString}
			className="chrome"
			onClick={!expandedState ? () => setExpanded(true) : null}
		>
			<Link to="/" className="project-name">
				GateViz
			</Link>
			<Line pose={stateString} />
			<Inputs stateString={stateString} />
		</Drawer>
	);
};

export default Chrome;
