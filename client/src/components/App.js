import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

const Header = () => <h2> Header </h2>;
const Landing = () => <h2> Landing </h2>;

class App extends Component {
	componentDidMount(){
		
	}
	render() {
		console.log(this.props);
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

export default connect(null, actions)(App);