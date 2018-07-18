import React, { Component } from 'react';
import PropTypes from 'prop-types';

// B 的 parent
export default class BParent extends Component {
    render() {
        return (
            <div className="card">
                <B />
            </div>
        );
    }
}

// B
class B extends Component {

    render() {
        return (
            <div>
                我是parentB 下的 B, value是：
          {this.context.value}
            </div>
        );
    }
}

B.contextTypes = {
    value: PropTypes.string,
};