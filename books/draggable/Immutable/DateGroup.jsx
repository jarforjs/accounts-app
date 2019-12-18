import moment from 'moment';
import React, { PropTypes, Component } from 'react';
import { Form, Checkbox, DatePicker, Row, Col, Popover } from 'antd';
import FormTip from './FormTip';

const FormItem = Form.Item;

const FORMAT = 'YYYY-MM-DD';

class DateCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
    };
  }

  onChange = (e) => {
    const checked = e.target.checked;
    this.state = {
      checked,
    };
    this.props.onChange(checked);
  }

  render() {
    const { disabled, children } = this.props;
    const { checked } = this.state;
    return <Checkbox disabled={disabled} checked={checked} children={children} onChange={this.onChange}/>;
  }
}

class DateGroup extends Component {

  static defaultProps = {
    fieldName: '',
    label: '',
    // value: {},
    placeholder: '',
    disabled: false,
    isLongTerm: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      isLongDate: props.isLongTerm,
    };
  }

  handleLongTerm = (checked) => {
    const { form: { setFieldsValue, validateFields, getFieldValue }, fieldName } = this.props;

    setFieldsValue({
      [`${fieldName}.isLongTerm`]: checked,
      [`${fieldName}.dateLimitation`]: getFieldValue('dateLimit.dateLimitation') || moment('9999-12-31', FORMAT),
    });

    this.setState({
      isLongDate: checked,
    }, () => {
      validateFields([`${fieldName}.dateLimitation`], { force: true });
    });
  }

  render() {
    const { layout, form: { getFieldDecorator }, value, isLongTerm, fieldName, disabled, title, onChange } = this.props;

    const disabledDate = current => current && current.valueOf() < Date.now();

    const formTip = (
      <div className="formTipTextWrapper">
        <FormTip type="weak">
          {title}，
          <Popover
            content={
              <img
                className="tip-icon"
                src="https://www.baidu.com/img/superlogo_c4d7df0a003d3db9b65e9ef0fe6da1ec.png?where=super" alt="有效期"
              />
            }
            trigger="click"
          >
            <a>查看示例</a>
          </Popover>
        </FormTip>
      </div>
    );

    return (
      <div>
        <Row>
          <Col span={24}>
            {formTip}
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DatePicker
              style={{ width: '90%' }}
              format={FORMAT}
              value={value}
              disabledDate={disabledDate}
              disabled={disabled || this.state.isLongDate}
              onChange={onChange}
            />
          </Col>
          <Col span={12}>
            <FormItem
              {...layout}
            >
              {
                getFieldDecorator(`${fieldName}.isLongTerm`, {
                  initialValue: !!isLongTerm,
                  onChange: this.handleLongTerm.bind(this),
                })(
                  <DateCheckbox disabled={disabled} checked={isLongTerm}>长期</DateCheckbox>,
                )
              }
            </FormItem>
          </Col>
        </Row>
      </div>
    );
  }
}

export default DateGroup;
