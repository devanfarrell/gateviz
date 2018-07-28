import React, { Component } from 'react';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeSearchTerm, fetchCircuit } from '../actions';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			term: '',
			circuit: ''
		};
	}

	render() {
		if (this.props.selectedCircuit) {
			return (
				<form>
					<FormGroup >
						<InputGroup>
							<FormControl
								type="text"
								value={this.state.term}
								onChange={event => this.onInputChange(event.target.value)}
								placeholder=" Search for a circuit"
							/>
							<InputGroup.Button>
								<Button type="submit" className="activeButton" onSubmit={this.onLoadClick()}>Load</Button>
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
		this.setState({ term: term });
		this.props.changeSearchTerm(term);
	}

	onLoadClick() {
		const circuit = this.props.selectedCircuit
		this.props.fetchCircuit(circuit);
	}
}

function mapStateToProps({ selectedCircuit }, ownProps) {
	return { selectedCircuit };
}

export default connect(
	mapStateToProps,
	{ changeSearchTerm, fetchCircuit }
)(SearchBar);
