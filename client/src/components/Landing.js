import React, { Component } from 'react';
import CircuitList from './Circuit_List';
import SearchBar from './Search_Bar';
import { connect } from 'react-redux';
import { fetchCircuitList } from '../redux/actions';

class Landing extends Component {
	componentDidMount(){
		this.props.fetchCircuitList();
	}

	render() {
		return (
			<div>
				<div className="hero centerallthethings">
					<h1 className="heroPrimary"> GateViz </h1>
					<h2 className="heroSecondary"> a combinational logic education tool </h2>
				</div>
				<SearchBar />
				<CircuitList circuitList={this.props.circuitList} />
			</div>
		);
	}
}

function mapStateToProps( {circuitList} , ownProps ){
    return { circuitList };
}

export default connect(mapStateToProps, { fetchCircuitList })(Landing);
