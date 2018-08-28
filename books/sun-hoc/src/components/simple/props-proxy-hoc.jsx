import React, { Component } from 'react';

//属性代理
const propsProxyHoc = WrappedComponent => class extends Component {
 
  handleClick() {
    console.log('click');
  }

  render() {
    return (<WrappedComponent
      {...this.props}
      handleClick={this.handleClick}
    />);
  }
};
export default propsProxyHoc;
