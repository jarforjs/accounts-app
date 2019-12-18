import React from 'react';
import './FormTip.less';

const FormTip = React.createClass({
  getDefaultProps() {
    return ({
      children: '',
      type: 'weak',
    });
  },
  render() {
    const type = this.props.type;
    return (
      <span className={`formTip ${type ? `formTip-${type}` : ''}`}>{this.props.children}</span>
    );
  },
});

export default FormTip;

