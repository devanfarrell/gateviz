import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Circuit from './Circuit';
import Header from './Header';
import Landing from './Landing';
import '../index.css'

class App extends Component {
	render() {
		return (
			<div>
				<BrowserRouter>
					<div>
						<Header />
						<div className="container">
							<Route exact path="/" component={Landing} />
							<Route path="/circuit/" component={Circuit} />
						</div>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}


export default App;