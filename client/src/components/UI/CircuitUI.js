import React, { Component } from 'react';
import { Breadcrumb, Navbar, FormGroup, FormControl, Button, InputGroup } from 'react-bootstrap';
import { initBreadcrumb, changeInputs, stepBackBreadcrumb } from '../../redux/actions';
import { connect } from 'react-redux';
import Sidebar from './sidebar';

class CircuitUI extends Component {

    componentDidMount() {
        this.props.initBreadcrumb(this.props.name);
    }

    renderCrumbs() {
        //If the breadcrumbs object has been fetched
        if (this.props.breadcrumbs) {
            //Access each element of the array
            const breadcrumbs = this.props.breadcrumbs.map(breadcrumb => {
                //Display it if a search term hasn't been defined or if the name of the circuit contains a substring of the term or if it is the selected circuit
                return (
                    <Breadcrumb.Item key={`${breadcrumb.id}--${breadcrumb.depth}`} onClick={ ()=> this.props.stepBackBreadcrumb(breadcrumb) }>{breadcrumb.name}</Breadcrumb.Item>
                );
            });
            return breadcrumbs;
        } else {
            return null;
        }
    }

    render() {
        return (
            <>
                <div className="UiTopbar">
                    <Breadcrumb>
                        {this.renderCrumbs()}
                    </Breadcrumb>
                </div>
                <div className="UiSideBar">
                    <Sidebar
                        circuit={this.props.circuit}
                        canAutoEval={true}
                    />
                </div>
            </>
        );
    }
}

function mapStateToProps({ breadcrumbs, circuit }, ownProps) {
    return { breadcrumbs, circuit };
}

export default connect(mapStateToProps, { initBreadcrumb, changeInputs, stepBackBreadcrumb })(CircuitUI);
