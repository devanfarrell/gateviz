import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Circuit from 'views/circuit';
// import Header from './Header';
import Landing from './views/landing';
import { initialize } from 'redux/circuitlist/actions';
import { bindActionCreators } from 'redux';
import { actionTypes } from 'redux/utils';

class Router extends Component {
	componentDidMount() {
		this.props.initialize(actionTypes.REQUEST);
	}

	render() {
		return (
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
	}
}

const mapDispatch = dispatch => bindActionCreators({ initialize }, dispatch);

export default connect(
	null,
	mapDispatch
)(Router);
