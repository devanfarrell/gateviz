import * as React from 'react'
import ReactToggle from 'react-toggle'

import './toggle.css';

interface IToggle {
    checked: boolean;
    id: string;
    lable: string;
    handleToggle(event: any): void;
}

const Toggle = (props: IToggle) => {
    return (
        <>
            <ReactToggle
                id={props.id}
                defaultChecked={props.checked}
                onChange={props.handleToggle(props.id)}
                icons={{
                    checked: <div style={{color: "rgb(255, 255, 255)", fontSize: "1.2em", position: "absolute", top: "0.3em"}} >1</div>,
                    unchecked: <div style={{color: "rgb(255, 255, 255)", fontSize: "1.2em", position: "absolute", top: "0.3em"}}>0</div>,
                  }}
            />
            <label htmlFor={props.id}>{props.lable}}</label>
        </>
    )
};

export default Toggle;