import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AParent from './AParent';
import BParent from './BParent';

// 顶级公共组件
export default class Context extends Component {

    constructor() {
        super();
        this.state = {
            value: '',
        };
    }

    setValue = value => {
        this.setState({
            value,
        })
    }

    getChildContext() { // 必需
        return {
            value: this.state.value,
            setValue: this.setValue,
        };
    }

    render() {
        return (
            <div>
                <AParent />
                <BParent />
            </div>
        );
    }
}

// 必需
Context.childContextTypes = {
    value: PropTypes.string,
    setValue: PropTypes.func,
};