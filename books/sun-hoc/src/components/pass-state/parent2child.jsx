import React, { Component } from 'react';
//父-》子
export default class Parent extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
        }
    }

    handleChange = e => {
        this.value = e.target.value;
    }

    handleClick = () => {
        console.log(this.value,'value')
        this.setState({
            value: this.value,
        })
    }

    render() {
        return (
            <div>
                我是parent
                <input onChange={this.handleChange} />
                <div className="button" onClick={this.handleClick}>通知</div>
                <div>
                    <Child value={this.state.value} />
                </div>
            </div>
        );
    }
}

// 子组件
class Child extends Component {
    render() {
        const { value } = this.props;
        return (
            <div>
                我是Child，得到传下来的值：{value}
            </div>
        );
    }
}