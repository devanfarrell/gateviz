import * as React from 'react';

import BusInput from './BusInput';
import toggle from './toggle';

// Lambda used because cost is negligable and more readable
/* tslint:disable:jsx-no-lambda */

class InputPanel extends React.Component {

    public render() {

        return (
         <BusInput
            lable="stuff"
            numInputs=3
            onInputChange=()=>{console.log("click clack")};
         />
        )
    }
}

export default InputPanel;
