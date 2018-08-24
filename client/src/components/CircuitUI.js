import React, { Component } from 'react';
import { Breadcrumb, Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';
import { initBreadcrumb } from '../actions';
import { connect } from 'react-redux';

class CircuitUI extends Component {

    componentDidMount() {
        this.props.initBreadcrumb(this.props.name);
    }

    renderCrumbs() {
        //If the breadcrumbs object has been fetched
        console.log('renderCrumbs call: ', this.props.breadcrumbs);
        if (this.props.breadcrumbs) {
            //Access each element of the array
            const breadcrumbs = this.props.breadcrumbs.map(breadcrumb => {
                //Display it if a search term hasn't been defined or if the name of the circuit contains a substring of the term or if it is the selected circuit
                return (
                    <Breadcrumb.Item key={breadcrumb.id}>{breadcrumb.name}</Breadcrumb.Item>
                );
            });

            console.log('Yo crumb, why so glum', breadcrumbs);
            return breadcrumbs;
        } else {
            return null;
        }
    }

    render() {
        console.log(this.props)
        return (
            <Navbar fixedBottom inverse>
                <Navbar.Form style={{ paddingLeft: 0, width: '100%' }}>
                    <Button type="submit">Evaluate</Button>
                    <FormGroup>
                        <FormControl type="text" placeholder="Input" style={{ width: 'auto' }} />
                    </FormGroup>{' '}
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

export default connect(mapStateToProps, { initBreadcrumb })(CircuitUI);
