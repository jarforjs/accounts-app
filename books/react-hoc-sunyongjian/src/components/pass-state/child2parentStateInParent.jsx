import React, { Component } from 'react';
//子-》父
//state 定义在 parent 组件
//parent组件传给child组件，符合react的单向数据流理念，自上到下传递props。
//父组件做的就是定义好 state ，定义好事件函数，input onChange 的时候，去缓存 value 值，然后点击 button 的时候，改变 state , 子组件只负责展示 value 。
export default class Parent extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
        }
    }

    setValue = value => {
        this.setState({
            value,
        })
    }

    render() {
        return (
            <div>
                <div>我是parent, Value是：{this.state.value}</div>
                <Child setValue={this.setValue} />
            </div>
        );
    }
}

// 子组件
class Child extends Component {
    handleChange = e => {
        this.value = e.target.value;
    }

    handleClick = () => {
        const { setValue } = this.props;
        setValue(this.value);
    }

    render() {
        return (
            <div>
                我是Child
            <div className="card">
                    state 定义在 parent
              <input onChange={this.handleChange} />
                    <div className="button" onClick={this.handleClick}>通知</div>
                </div>
            </div>
        );
    }
}