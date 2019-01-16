import * as React from 'react';
import {ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeInputs } from '../../../redux/actions';
import Toggle from '../toggle';

// Lambda used because cost is negligable and more readable
/* tslint:disable:jsx-no-lambda */

interface SidebarProps {
    // eventually, there will be a prop that defines whether or not a circuit can be automatically evaluated which will remove the option from the UI
    changeInputs: any
    circuit: any
    canAutoEval: boolean
}

interface SidebarState {
    // eventually, there will be a prop that defines whether or not a circuit can be automatically evaluated which will remove the option from the UI
    autoEval: any
    localInputs: boolean[]
}

class Sidebar extends React.Component<SidebarProps, SidebarState> {

    public constructor(props) {
        super(props);
        this.handleEvaluationModeChange = this.handleEvaluationModeChange.bind(this);
        this.handleToggleChange = this.handleToggleChange.bind(this);
        this.handleEvaluation = this.handleEvaluation.bind(this);
        const initializedArray = new Array(props.circuit.input.length);
        for (let i = 0; i < props.circuit.input.length; i++) {
            initializedArray[i] = false;
        }
        this.state = {
            autoEval: true,
            localInputs: initializedArray
        }
    }

    public render() {
        return(
            <>
                <div className="sideBar">
                    <ToggleButtonGroup
                        type="radio"
                        name="Evaluation Mode"
                        onChange={this.handleEvaluationModeChange}
                        defaultValue={1}
                    >
                        <ToggleButton
                            name="automatic"
                            value={1}
                            disabled={!this.props.canAutoEval}
                        > automatic</ToggleButton>
                        <ToggleButton
                            name="manual"
                            value={2}
                            disabled={!this.props.canAutoEval}
                        > manual</ToggleButton>
                    </ToggleButtonGroup>
                    {this.renderToggles()}
                    <Button className="toggle" onClick={this.handleEvaluation} type="submit" disabled={!!this.props.canAutoEval && this.state.autoEval}>Evaluate</Button>
                </div>
            </>
        )
    }

    private handleEvaluationModeChange(input) {
        
        const state = input === 1 ? true : false;
        this.setState({ autoEval:state })
        if(state){
            this.handleEvaluation();
        }
    }

    private handleToggleChange(input) {

        const copy = this.state.localInputs;
        copy[input] = !copy[input];
        this.setState({
            autoEval:this.state.autoEval,
            localInputs: copy
        })

        if(!!this.props.canAutoEval && this.state.autoEval) {
            this.handleEvaluation();
        }
    }

    private handleEvaluation(){
        this.props.changeInputs({ circuit: this.props.circuit, input: this.state.localInputs });
    }

    private renderToggles() {
        // iterator has to start at -1 so that array starts at 0
        let iterator = -1;
        return this.props.circuit.input.map( input => {
            iterator++;
            if(input.type === "SINGLE_INPUT") {
                return (
                    <div key={input.id} className="toggle">
                        <Toggle
                            checked={this.state.localInputs[iterator]}
                            id={iterator}
                            label={input.label}
                            handleToggle={this.handleToggleChange}
                        />
                    </div>
                )
            } else {
                console.log("This is probably a multi-input error");
                return (<div> something bad happened </div> );
            }
        })
    }
}

function mapStateToProps({ circuit }, ownProps) {
    return { circuit };
}

export default connect(mapStateToProps, {changeInputs})(Sidebar);