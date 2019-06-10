import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Circuit from 'views/circuit';
// import Header from './Header';
import Landing from './views/landing';

const Router = props => (
	<div>
		<BrowserRouter>
			<div>
				{/* <Header /> */}
				<div>
					<Route exact={true} path="/" component={Landing} />
					<Route path="/circuit/:cid" component={Circuit} />
				</div>
			</div>
		</BrowserRouter>
	</div>
);

export default Router;
