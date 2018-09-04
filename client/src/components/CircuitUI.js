import React, { Component } from 'react';
import { Breadcrumb, Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';
import { initBreadcrumb, changeInputs } from '../actions';
import { connect } from 'react-redux';

class CircuitUI extends Component {

    constructor(props) {
		super(props);

		this.state = {
			input: ''
		};
	}

    componentDidMount() {
        this.props.initBreadcrumb(this.props.name);
        // initialize this.state.input here
    }

    renderCrumbs() {
        //If the breadcrumbs object has been fetched
        if (this.props.breadcrumbs) {
            //Access each element of the array
            const breadcrumbs = this.props.breadcrumbs.map(breadcrumb => {
                //Display it if a search term hasn't been defined or if the name of the circuit contains a substring of the term or if it is the selected circuit
                return (
                    <Breadcrumb.Item key={breadcrumb.id}>{breadcrumb.name}</Breadcrumb.Item>
                );
            });
            return breadcrumbs;
        } else {
            return null;
        }
    }

    render() {
        return (
            <Navbar fixedBottom inverse>
                <Navbar.Form style={{ paddingLeft: 0, width: '100%' }}>
                    <Button onClick={() => this.props.changeInputs({circuit: this.props.circuit, input: this.state.input}) }type="submit">Evaluate</Button>
                    <FormGroup>
                        <FormControl
                            type="text"
                            placeholder="Input"
                            value={this.state.input}
                            onChange={event => this.onInputChange(event.target.value)}
                            style={{ width: 'auto' }}
                        />
                    </FormGroup>
                </Navbar.Form>
                <Breadcrumb>
                    {this.renderCrumbs()}
                </Breadcrumb>
            </Navbar>
        );
    }
}

function mapStateToProps({ breadcrumbs }, ownProps) {
    return { breadcrumbs };
}

export default connect(mapStateToProps, { initBreadcrumb, changeInputs })(CircuitUI);
