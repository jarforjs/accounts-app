import React, { Component } from 'react';
import { Input, Button, Form, Icon } from 'antd';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/styles/prism';
import moment from 'moment';
import _ from 'lodash';
import util from 'ant-util';
import { List, fromJS, is, Map } from 'immutable';
import DateGroup from './DateGroup';
import styles from './Index.less';
import Person from './Person';
const { pick } = util

const FormItem = Form.Item;
const FORMAT = 'YYYY-MM-DD';
const FORM_ITEM_LAYOUT = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
function hasErrors(fieldsError) {
  JSON.stringify(fieldsError, null, 2)
  return Object.keys(fieldsError).some((field) => {
    console.log(field, 'field');
    console.log(fieldsError, 'fieldsError');
    return fieldsError[field];
  });
}

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      count: 0,
      data: Map({ times: 0 }),
    };
    this.haha = this.haha.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClickLater = this.onClickLater.bind(this);
  }

  componentDidMount() {
    this.props.form.validateFields();
    document.querySelector('#btn-raw').addEventListener('click', this.onClick);
  }

  haha = () => {
    const currentCourt = this.state.count;
    this.setState({ count: currentCourt + 1 });
    this.setState({ count: currentCourt + 2 });
    this.setState({ count: currentCourt + 3 });
    // this.state.count = this.state.count + 1;
    // this.state.count = this.state.count + 1;
    // this.state.count = this.state.count + 1;
    // this.setState();
  }
  onClick() {
    this.setState({ count: this.state.count + 1 });
    console.log('# this.state', this.state);
  }

  onClickLater() {
    setTimeout(() => {
      this.onClick();
    });
  }
  // handleAdd() {
  //   // const data = _.cloneDeep(this.state.data);
  //   const data = this.state.data;
  //   data.times += 1;
  //   this.setState({ data });
  //   // 如果上面不做 cloneDeep，下面打印的结果会是已经加 1 后的值。
  //   console.log(this.state.data.times, 1);
  // }
  // setState 的一个技巧
  handleAdd() {
    // this.setState((prevState, props) => ({
    this.setState(({ data }) => ({
      data: data.update('times', v => v + 1),
    }), () => {
      console.log(this.state.data.get('times'), 'in');
    });
    // 这时的 times 并不会改变
    console.log(this.state.data.get('times'), 'out');
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { username, password } = values;
        this.setState({
          persons: [
            ...this.state.persons,
            ...[
              { username, password },
            ],
          ],
        });
      }
    });
  }

  render() {
    const { persons } = this.state;
    const { form } = this.props;
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, setFieldsValue,
    } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    console.log('#enter render');

    const fieldName = 'dateLimit';
    const outputValue = {
      certNo: '123456788900',
      certPic: '1234456678899',
      dateLimitation: '2999-12-31',
      isLongTerm: false,
    };

    const { dateLimitation, isLongTerm } = pick(outputValue, ['dateLimitation', 'isLongTerm']);

    return (
      <div>
        <div className={styles.head}>
          <button onClick={this.onClick}>Increment</button>
          <button id="btn-raw">Increment Raw</button>
          <button onClick={this.onClickLater}>Increment Later</button>
          <h2 onClick={this.handleAdd}>react如何性能达到最大化(前传)，暨react为啥非得使用immutable.js</h2>
        </div>
        <div className={styles.content}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              validateStatus={userNameError ? 'error' : ''}
              help={userNameError || ''}
            >
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />,
              )}
            </FormItem>
            <FormItem
              validateStatus={passwordError ? 'error' : ''}
              help={passwordError || ''}
            >
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />,
              )}
            </FormItem>
            <FormItem
              key={`${fieldName}.dateLimitation`}
              {...FORM_ITEM_LAYOUT}
              label="执照有效期"
            >
              {
                getFieldDecorator(`${fieldName}.dateLimitation`, {
                  initialValue: dateLimitation ? moment(dateLimitation, FORMAT) : moment(),
                  rules: [
                    { required: true, message: '请选择日期' },
                  ],
                  onChange: (date) => {
                    setFieldsValue({
                      [`${fieldName}.dateLimitation`]: date,
                    });
                  },
                })(
                  <DateGroup
                    title="请填到期时间"
                    key={fieldName}
                    label="执照有效期"
                    disabled={false}
                    form={form}
                    fieldName={fieldName}
                    layout={FORM_ITEM_LAYOUT}
                    isLongTerm={isLongTerm}
                  />,
                )
              }
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
              >
                Log in
              </Button>
            </FormItem>
          </Form>
          <div>
            {persons.map((person, index) => (
              <Person
                key={index}
                username={person.username}
                password={person.password}
                detail={person}
                onClick={this.haha}
              />
            ))}
          </div>
          <h3 className={styles.title} onClick={this.haha}>
            pureRender {this.state.count}
          </h3>
          <div className={styles.des}>
            pureRender其实就是一个函数，接受一个Component。把这个Component搞一搞，返回一个Component。<br/>
            看他pureRender的源代码就一目了然
          </div>
          <SyntaxHighlighter language="javascript" style={prism}>
            {`function shouldComponentUpdate(nextProps, nextState) {
  return shallowCompare(this, nextProps, nextState);
}

function pureRende(component) {
  component.prototype.shouldComponentUpdate = shouldComponentUpdate;
}
module.exports = pureRender;`}
          </SyntaxHighlighter>
          <div className={styles.des}>
            pureRender很简单，就是把传进来的component的shouldComponentUpdate给重写掉了，原来的shouldComponentUpdate，无论怎样都是return ture，现在不了，我要用shallowCompare比一比，shallowCompare代码及其简单，如下
          </div>
          <SyntaxHighlighter language="javascript" style={prism}>
            {`function shallowCompare(instance, nextProps, nextState) {
  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}`}
          </SyntaxHighlighter>
          <div className={styles.des}>
            pureRender很简单，就是把传进来的component的shouldComponentUpdate给重写掉了，原来的shouldComponentUpdate，无论怎样都是return ture，现在不了，我要用shallowCompare比一比，shallowCompare代码及其简单，如下
          </div>
          <SyntaxHighlighter language="javascript" style={prism}>
            {`function shallowCompare(instance, nextProps, nextState) {
  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}`}
          </SyntaxHighlighter>
          <div className={styles.des}>
            一目了然。分别拿现在props&state和要传进来的props&state，用shallowEqual比一比，要是props&state都一样的话，就return false，是不是感觉很完美？不。。这才刚刚开始，问题就出在shallowEqual上了
          </div>
          <h3 className={styles.title}>
            shallowEqual
          </h3>
          <div className={styles.des}>
            shallowEqual，是个什么东西，shallowEqual其实只比较props的第一层子属性是不是相同，就像上述代码，props 是如下
          </div>
          <SyntaxHighlighter>
            {`{
  detail:{
    name:"123",
    age:"123",
  }
}`}
          </SyntaxHighlighter>
          <div className={styles.des}>
            <h3>他只会比较props.detail === nextProps.detail</h3>
            <p>
              情况一，我修改detail的内容，而不改detail的引用：由于引用是同一个比较永远是true
            </p>
            <p>
              情况二，我修改detail的引用：这种虽然没有bug，但是容易误杀，比如如果我新旧两个detail的内容是一样的，岂不是还要，render。。所以还是不完美，，你可能会说用 深比较就好了，，但是 深比较及其消耗性能，要用递归保证每个子元素一样,这里就要引用immutable.js了
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(Index);
