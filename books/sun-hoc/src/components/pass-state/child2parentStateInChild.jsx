import React, { Component } from 'react';
//子-》父
//state 定义在 chlid 组件
//child 组件通知 parent 组件， 主要是依靠 parent 传下来的 callback 函数执行，改变 parent 组件的状态，或者把 child 自己的 state 通知 parent 。分两种情况：
//parent 组件把改变 state 的 setValue 函数传给 child ，child 组件自己处理内部的状态（这里是表单的value值），当 child 组件分发消息的时候， 执行 parent 的 setValue 函数，从而改变了 parent 的 state，state发生变化， parent 组件执行 re-render 。
//有时候 state 是需要定义在 child 组件的，比如弹窗， CheckBox 这种开关性质的，逻辑是重复的，state 定义在组件内部更好维护， 复用性更好。但是 child 的 state 是需要告知我的 parent 组件的， 同样还是执行 parent 传下来的 change 函数。

export default class Parent extends Component {
    constructor() {
        super();
        this.state = {
            value: ''
        }
    }
    onChange = value => {
        console.log(value, '来自 child 的 value 变化');
        this.setState({
            value
        })
    }

    render() {
        return (
            <div>
                <div>我是parent{this.state.value}</div>
                <Child onChange={this.onChange} />
            </div>
        );
    }
}

// 子组件
class Child extends Component {
    constructor() {
        super();
        this.state = {
            childValue: ''
        }
    }

    childValChange = e => {
        this.childVal = e.target.value;
    }

    childValDispatch = () => {
        const { onChange } = this.props;
        this.setState({
            childValue: this.childVal,
        }, () => { onChange(this.state.childValue) })
    }

    render() {
        return (
            <div>
                我是Child
            <div className="card">state 定义在 child
                <input onChange={this.childValChange} />
                    <div className="button" onClick={this.childValDispatch}>通知</div>
                </div>
            </div>
        );
    }
}