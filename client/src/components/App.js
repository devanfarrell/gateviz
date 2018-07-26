import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCircuit } from '../actions';

const Header = () => <h2> Header </h2>;
const Landing = () => <h2> Landing </h2>;

class App extends Component {
	componentDidMount(){
		this.props.fetchCircuit();
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

function mapStateToProps( {circuit} , ownProps ){
    return { circuit };
}

export default connect(mapStateToProps, { fetchCircuit })(App);