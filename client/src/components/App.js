import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCircuit } from '../actions';

import Header from './Header';
import Landing from './Landing';
import '../App.css'

class App extends Component {
	componentDidMount(){
		this.props.fetchCircuit();
	}
	render() {
		return (
			<div>
				<BrowserRouter>
					<div>
						<Header />
						<div className="container">
							<Route exact path="/" component={Landing} />
						</div>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}


export default connect(null, { fetchCircuit })(App);