import React, { Component } from 'react';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import styles from './Index.less';

class Person extends Component {
  componentWillReceiveProps(newProps) {
    console.log(`我新的props的username是${newProps.username}，password是${newProps.password}。我以前的props的username是${this.props.username}，password是${this.props.password}。我要re-render了`);
  }
  render() {
    const { username, password, detail, onClick } = this.props;

    return (
      <div>
        <span onClick={onClick}>姓名:</span>
        <span>{username};</span>
        <span>密码:</span>
        <span>{password};</span>
        <span>详情:</span>
        <span>{detail.username},{detail.password}</span>
      </div>
    );
  }
}

export default immutableRenderDecorator(Person);
