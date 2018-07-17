import React, { Component } from 'react';

// 兄弟A
export default class A extends Component {

    handleChange = (e) => {
        this.value = e.target.value;
        console.log(this.value,'value')
    }

    handleClick = () => {
        const { setValue } = this.props;
        setValue(this.value);
    }

    render() {
        return (
            <div className="card">
                我是Brother A, <input onChange={this.handleChange} />
                <div className="button" onClick={this.handleClick}>通知</div>
            </div>
        )
    }
}
