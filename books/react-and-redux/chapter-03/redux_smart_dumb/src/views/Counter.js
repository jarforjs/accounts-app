import React, { Component, PropTypes } from 'react';

import store from '../Store.js';
import * as Actions from '../Actions.js';

const buttonStyle = {
  margin: '10px'
};

// class Counter extends Component {
//   render() {
//     const {caption, onIncrement, onDecrement, value} = this.props;

//     return (
//       <div>
//         <button style={buttonStyle} onClick={onIncrement}>+</button>
//         <button style={buttonStyle} onClick={onDecrement}>-</button>
//         <span>{caption} count: {value}</span>
//       </div>
//     );
//   }
// }

//其实还可以压缩一下代码转化为无状态组件写法
//因为没有状态，不需要用对象表示，就连类都不需要了，对于只有一个render方法的组件，缩略为一个函数足以
function Counter(props){
  const {caption, onIncrement, onDecrement, value} = props;
  return (
    <div>
      <button style={buttonStyle} onClick={onIncrement}>+</button>
      <button style={buttonStyle} onClick={onDecrement}>-</button>
      <span>{caption} count: {value}</span>
    </div>
  );
}

//还有一种惯常写法，就是结构赋值，三个点是扩展操作符不是es6的语法，我们这边用的是结构赋值（destructuring assignment）直接放在参数部分
// function Counter({caption, onIncrement, onDecrement, value})
//是不是很拽~~~！

Counter.propTypes = {
  caption: PropTypes.string.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};


class CounterContainer extends Component {
  constructor(props) {
    super(props);

    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getOwnState = this.getOwnState.bind(this);

    this.state = this.getOwnState();
  }

  getOwnState() {
    return {
      value: store.getState()[this.props.caption]
    };
  }

  onIncrement() {
    store.dispatch(Actions.increment(this.props.caption));
  }

  onDecrement() {
    store.dispatch(Actions.decrement(this.props.caption));
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.caption !== this.props.caption) ||
      (nextState.value !== this.state.value);
  }

  componentDidMount() {
    store.subscribe(this.onChange);
  }

  componentWillUnmount() {
    store.unsubscribe(this.onChange);
  }

  render() {
    return <Counter caption={this.props.caption}
      onIncrement={this.onIncrement}
      onDecrement={this.onDecrement}
      value={this.state.value} />
  }
}

CounterContainer.propTypes = {
  caption: PropTypes.string.isRequired
};

export default CounterContainer;

