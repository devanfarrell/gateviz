import { Component } from 'react';


export default class Canvas extends Component {
    render() {
        console.log(this.props);
        if(this.props.element) {
            return this.props.element;
        }else{
            return null;
        }
    }
}
