import React, { Component } from 'react';

class Usual extends Component {

    render() {
        console.log(this.props, 'props-usual');
        return <div onClick={this.props.handleClick}>
            Usual
    </div>
    }
};
export default Usual;