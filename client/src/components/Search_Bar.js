import React, { Component } from 'react';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { changeSearchTerm } from '../actions'

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = { term: '' };
	}

	render() {
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
							<Button> Load </Button>
						</InputGroup.Button>
					</InputGroup>
				</FormGroup>
			</form>
		);
	}

	onInputChange(term) {
		this.setState({ term: term });
		this.props.changeSearchTerm(term);
	}
}

export default connect(null, { changeSearchTerm })(SearchBar);
