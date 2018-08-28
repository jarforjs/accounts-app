import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AParent extends Component {
    render() {
        return (
            <div>
                <A />
            </div>
        )
    }
}

//A
class A extends Component {
    handleChange = (e) => {
        this.value = e.target.value
    }

    handleClick = () => {
        const { setValue } = this.context;
        setValue(this.value)
    }

    render() {
        return (
            <div>
                我是parentA 下的 A, <input onChange={this.handleChange} />
                <div className="button" onClick={this.handleClick}>通知</div>
            </div>
        )
    }
}

// 必需
A.contextTypes = {
    setValue: PropTypes.func,
};