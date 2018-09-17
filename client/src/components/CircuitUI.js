import React, { Component } from 'react';
import { Breadcrumb, Navbar, FormGroup, FormControl, Button, InputGroup } from 'react-bootstrap';
import { initBreadcrumb, changeInputs, stepBackBreadcrumb } from '../actions';
import { connect } from 'react-redux';

class CircuitUI extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hex: false,
            input: '',
            numInputs: 0
        };
        this.onInputChange = this.onInputChange.bind(this)
    }

    componentDidMount() {
        this.props.initBreadcrumb(this.props.name);
        var txt = "";
        for (var i = 0; i < this.props.circuit.inputLength; i++) {
        txt += '0';
        }

        this.setState({ input: txt, hex: this.state.hex, numInputs: this.props.circuit.inputLength });
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

    onInputChange(input) {
        var regexRules = null
        var validInput = true;
        // establish regex rules
        if (this.state.hex) {
            //figure out regex rules for hex later
            regexRules = /^[0-9\b]+$/;
        } else {
            regexRules = /^[0-1\b]+$/;
        }
        // test against regex rules
        if (!(input === '' || regexRules.test(input))) {
            validInput = false
        }

        if (validInput && this.state.hex) {
            //convert input from hex to a temp binary and test the length
        } else if (input.length > this.state.numInputs) {
            validInput = false
        }


        if (validInput) {
            this.setState({ input, hex: this.state.hex, numInputs: this.state.numInputs });
        }
    }

    onEvaluateClick() {
        var forProcessing = null;
        if (this.state.hex) {
            //convert hex to binary
            //forProcessing = binary
        } else {
            forProcessing = this.state.input
        }

        forProcessing = forProcessing.split('');
        for (var i = 0; i < forProcessing.length; i++) {
            forProcessing[i] = parseInt(forProcessing[i], 2);
        }
        this.props.changeInputs({ circuit: this.props.circuit, input: forProcessing });
    }

    render() {

        return (
            <Navbar fixedBottom inverse>
                <FormGroup>
                    <InputGroup>
                        <Button onClick={() => this.onEvaluateClick()} type="submit">Evaluate</Button>
                        <FormControl
                            type="text"
                            value={this.state.input}
                            onChange={event => this.onInputChange(event.target.value)}
                            placeholder="Input"
                            style={{ width: 'auto' }}
                        />
                    </InputGroup>
                </FormGroup>
                <Breadcrumb>
                    {this.renderCrumbs()}
                </Breadcrumb>
            </Navbar>
        );
    }
}

function mapStateToProps({ breadcrumbs, circuit }, ownProps) {
    return { breadcrumbs, circuit };
}

export default connect(mapStateToProps, { initBreadcrumb, changeInputs, stepBackBreadcrumb })(CircuitUI);
