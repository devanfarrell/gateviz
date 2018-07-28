import React from 'react'

const CircuitListItem = (props) => {
    //onClick={ () => onCircuitSelect(circuit) }
    return (
        <tr >
            <td>{props.name}</td>
            <td>{props.description}</td>
		</tr>
    );  
};

export default CircuitListItem;