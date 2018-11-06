import * as React from 'react';

import BusInput from './BusInput';
// import toggle from './toggle';

// Lambda used because cost is negligable and more readable
/* tslint:disable:jsx-no-lambda */

class InputPanel extends React.Component {

    constructor(props: any) {
        super(props);
    }

    public render() {
        
        const three: number = 3;
        const func =()=>{console.log("click clack")};

        return (
            <BusInput
            lable="stuff"
            numInputs={three}
            onInputChange={func}
            />

        )
    }
}

export default InputPanel;
