import React from 'react'

const CircuitListItem = (props) => {
    if(props.selectedCircuit === props.cid) {
        return (
            <tr onClick={ () => props.onCircuitSelect(props.cid) } className="selectedSearchElement">
                <td>{props.name}</td>
                <td>{props.description}</td>
            </tr>
        );

    } else {

    
    return (
        <tr onClick={ () => props.onCircuitSelect(props.cid) } className="saearchElement">
            <td>{props.name}</td>
            <td>{props.description}</td>
		</tr>
    );
}
};

export default CircuitListItem;