import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Circuit from 'views/circuit';
import Chrome from 'components/chrome';
import Landing from './views/landing';

const Router = props => (
	<BrowserRouter>
		<Chrome />
		<Route exact={true} path="/" component={Landing} />
		<Route path="/circuit/:cid" component={Circuit} />
	</BrowserRouter>
);

export default Router;
