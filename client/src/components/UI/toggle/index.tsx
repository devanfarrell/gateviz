import * as React from 'react'
import ReactToggle from 'react-toggle'

import './toggle.css';

const Toggle = (props) => {
    return (
        <>
            <ReactToggle
                id='cheese-status'
                // defaultChecked={props.cheeseIsReady}
                // onChange={this.handleToggle}
                icons={{
                    checked: <div style={{color: "rgb(255, 255, 255)", fontSize: "1.2em", position: "absolute", top: "0.3em"}} >1</div>,
                    unchecked: <div style={{color: "rgb(255, 255, 255)", fontSize: "1.2em", position: "absolute", top: "0.3em"}}>0</div>,
                  }}
            />
            <label htmlFor='cheese-status'>Adjacent label tag</label>
        </>
    )
};

export default Toggle;