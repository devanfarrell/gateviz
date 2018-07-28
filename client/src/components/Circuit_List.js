import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import CircuitListItem from './circuitListItem';

class CircuitList extends Component {
	renderList() {
        //If the circuit array has been fetched
		if (this.props.circuitList) {
            //Access each element of the array
			const circuitItems = this.props.circuitList.map( circuit => {
                //Display it if a search term hasn't been defined or if the name of the circuit contains a substring of the term
				if (!this.props.term || circuit.name.toUpperCase().indexOf(this.props.term.toUpperCase()) > -1) {
					return (
						<CircuitListItem
							name={circuit.name}
							description={circuit.description}
							key={circuit.cid}
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
				<Table responsive hover style={{ backgroundColor: 'white' }}>
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>{this.renderList()}</tbody>
				</Table>
			</div>
		);
	}
}

function mapStateToProps({ term }, ownProps) {
	return { term };
}

export default connect(
	mapStateToProps,
	null
)(CircuitList);
