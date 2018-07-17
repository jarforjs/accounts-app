import React, { Component } from 'react';
import A from './A';
import B from './B';

// container
//有时候可能出现页面中的某两部分通信，比如省市的级联选择，点击 button 改变颜色等等，组件并不是父子级，没有嵌套关系的时候。这种时候通常是依赖共有的顶级 Container 处理或者第三方的状态管理器。其实原理都是相通的，兄弟 A 的 value 发生变化，分发的时候把 value 值告诉一个中间者 C ，C 会自动告知 B，实现 B 的自动render 。

export default class Container extends Component {
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
                <A setValue={this.setValue} />
                <B value={this.state.value} />
            </div>
        );
    }
}

//组件 A 中的表单 value 值，告知了父级 Container 组件（通过 setValue 函数改变 state），组件 B 依赖于 Container 传下来的 state，会做出同步更新。这里的中间者是 Container。