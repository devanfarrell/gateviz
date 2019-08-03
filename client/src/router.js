import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './views/landing';
const Circuit = lazy(() => import('views/circuit'));


const Router = props => (
	<BrowserRouter>
		<Suspense fallback={<div>Loading...</div>}>
			<Switch>
				<Route exact={true} path="/" component={Landing} />
				<Route path="/circuit/:cid" component={Circuit} />
			</Switch>
		</Suspense>
	</BrowserRouter>
);

export default Router;
