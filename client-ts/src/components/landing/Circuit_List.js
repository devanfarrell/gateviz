import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import CircuitListItem from './circuitListItem';
import { selectCircuit } from '../../redux/actions';

class CircuitList extends Component {
	renderList() {
		//If the circuit array has been fetched
		if (this.props.circuitList) {
			//Access each element of the array
			const circuitItems = this.props.circuitList.map(circuit => {
				//Display it if a search term hasn't been defined or if the name of the circuit contains a substring of the term or if it is the selected circuit
				if (
					!this.props.term ||
					circuit.name.toUpperCase().indexOf(this.props.term.toUpperCase()) > -1 ||
					circuit.cid === this.props.selectedCircuit
				) {
					return (
						<CircuitListItem
							name={circuit.name}
							description={circuit.description}
							key={circuit.cid}
							cid={circuit.cid}
                            onCircuitSelect={this.props.selectCircuit}
                            selectedCircuit={this.props.selectedCircuit}
						/>
					);
				} else {
					return null;
				}
			});
			return circuitItems;
		} else {
			return null;
		}
	}

	render() {
		return (
			<div>
				<Table responsive style={{ backgroundColor: 'white' }}>
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody >{this.renderList()}</tbody>
				</Table>
			</div>
		);
	}
}

function mapStateToProps({ term, selectedCircuit }, ownProps) {
	return { term, selectedCircuit };
}

export default connect(
	mapStateToProps,
	{ selectCircuit }
)(CircuitList);
