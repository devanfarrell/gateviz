import * as React from 'react'
import ReactToggle from 'react-toggle'

import './toggle.css';

// Lambda used because cost is negligable and more readable
/* tslint:disable:jsx-no-lambda */

interface IToggle {
    checked: boolean;
    id: number;
    label: string;
    handleToggle(event: any): void;
}

const Toggle = (props: IToggle) => {
    return (
        <>
            <ReactToggle
                id={props.id.toString()}
                defaultChecked={props.checked}
                onChange={() => props.handleToggle(props.id)}
                icons={{
                    checked: <div style={{color: "rgb(255, 255, 255)", fontSize: "1.2em", position: "absolute", top: "0.2em"}}>1</div>,
                    unchecked: <div style={{color: "rgb(255, 255, 255)", fontSize: "1.2em", position: "absolute", top: "0.2em"}}>0</div>,
                  }}
            />
            <label className="toggleText" htmlFor={props.id.toString()}>{props.label}</label>
        </>
    )
};

export default Toggle;