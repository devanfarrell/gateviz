import React, { Component } from 'react';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeSearchTerm } from '../actions';
import { Redirect } from 'react-router-dom';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			term: '',
			toRoute: ''
		};
	}

	render() {
		if (this.state.toRoute.length > 0) {
			const url = `/circuit/${this.state.toRoute}`;
			return <Redirect to={url} />;
		}
		if (this.props.selectedCircuit) {
			return (
				<form>
					<FormGroup>
						<InputGroup>
							<FormControl
								type="text"
								value={this.state.term}
								onChange={event => this.onInputChange(event.target.value)}
								placeholder=" Search for a circuit"
							/>
							<InputGroup.Button>
								<Button type="submit" className="activeButton" onClick={() => this.onLoadClick()}>
									Load
								</Button>
							</InputGroup.Button>
						</InputGroup>
					</FormGroup>
				</form>
			);
		} else {
			return (
				<form>
					<FormGroup>
						<InputGroup>
							<FormControl
								type="text"
								value={this.state.term}
								onChange={event => this.onInputChange(event.target.value)}
								placeholder=" Search for a circuit"
							/>
							<InputGroup.Button>
								<Button className="disabledButton"> Load </Button>
							</InputGroup.Button>
						</InputGroup>
					</FormGroup>
				</form>
			);
		}
	}

	onInputChange(term) {
		this.setState({ term: term, toRoute: this.state.toRoute });
		this.props.changeSearchTerm(term);
	}

	onLoadClick() {
		this.setState({ term: this.state.term, toRoute: this.props.selectedCircuit });
	}
}

function mapStateToProps({ selectedCircuit, circuit }, ownProps) {
	return { selectedCircuit, circuit };
}

export default connect(
	mapStateToProps,
	{ changeSearchTerm }
)(SearchBar);
