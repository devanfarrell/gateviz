import * as React from 'react';
import { FormControl, FormGroup, InputGroup } from 'react-bootstrap';

// Lambda used because cost is negligable and more readable
/* tslint:disable:jsx-no-lambda */

interface BusProps {
    lable: string;
    numInputs: number;
    onInputChange(event: any): void;
}

interface BusState {
    hex: boolean;
    input: string;
}

export default class BusInput extends React.Component<BusProps, BusState> {

    constructor(props: BusProps) {
        super(props);

        this.state = {
            hex: false,
            input: ''
        };
        this.onInputChange = this.onInputChange.bind(this)
    }

    public render() {
        return (
        <FormGroup>
            <InputGroup>
                <FormControl
                    type="text"
                    value={this.state.input}
                    onChange={event => this.onInputChange((event.target as HTMLInputElement).value)}
                    placeholder="Input"
                    style={{ width: 'auto' }}
                />
            </InputGroup>
        </FormGroup>
        )
    }

    private onInputChange(input) {
        let regexRules: RegExp = /^[0-9\b]+$/;
        let validInput = true;
        // establish regex rules
        if (this.state.hex) {
            // figure out regex rules for hex later
            regexRules = /^[0-9\b]+$/;
        } else {
            regexRules = /^[0-1\b]+$/;
        }
        // test against regex rules
        if (!(input === '' || regexRules.test(input))) {
            validInput = false
        }

        if (validInput && this.state.hex) {
            // convert input from hex to a temp binary and test the length
        } else if (input.length > this.props.numInputs) {
            validInput = false
        }

        if (validInput) {
            this.setState({ input, hex: this.state.hex });
        }
    }
}