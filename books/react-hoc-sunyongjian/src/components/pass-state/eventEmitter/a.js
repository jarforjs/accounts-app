import { event } from './eventEmitter';
import React, { Component } from 'react';

export default class A extends Component {
    handlechange = e => {
        this.value = e.target.value;
    }

    handleClick = () => {
        event.emit('dispatch', this.value)
    }

    render() {
        return (
            <div className="card">
                我是Brother A，<input onChange={this.handlechange} /><br/>
                <button onClick={this.handleClick}>通知</button>
            </div>
        )
    }
}