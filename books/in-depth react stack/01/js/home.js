import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Mask from './mask';
import styles from '../css/home.css'
import Dialog from './dialog/Dialog';
import Layer from './dialog/Layer';

class RenderDialogContent extends Component {

  render() {
    return (
      <div>
        <div className={styles.dialogContentLine}>
          <span className={styles.label}>User Name</span>
          <input className={styles.userInput}
            type='text'
            placeholder="Please input user name"
            ref='userInput' />
        </div>
        <div className={styles.dialogContentLine}>
          <span className={styles.label}>Password</span>
          <input className={styles.userInput}
            type='password'
            placeholder="Please input your passwords"
            ref='userPassword' />
        </div>
      </div>
    )
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      showDialog: false,
      userName: '',
    }
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  onCancel = () => {
    this.setState({
      visible: false
    })
  }

  onOk = () => {
    this.setState({
      visible: false
    })
  }

  showDialog() {
    this.setState({
      showDialog: true
    })
  }
  closeDialog() {
    //close the dialog, add some validations
    this.setState({
      showDialog: false
    })
  }

  okEvent() {
    let userName = this.refs.customerContent.refs.userInput.value;
    alert(userName);
    this.closeDialog();
  }

  render() {
    let dialogOptions = {
      width: 400,
      height: 300,
      title: 'Log in',
      closeFun: this.closeDialog.bind(this),
      hasOkBtn: true,
      okEvent: this.okEvent.bind(this),
      hasCancelBtn: true,
      cancelEvent: this.closeDialog.bind(this)
    }

    return (
      <div>
        <input type="button" onClick={this.showModal} value="Ele显示弹框" />

        <hr />

        <button onClick={this.showDialog.bind(this)}>Open dialog（不稳定方法）</button>
        <Layer className={styles.layer} open={this.state.showDialog}>
          <Dialog options={dialogOptions}>
            <RenderDialogContent ref='customerContent' userName={this.state.userName} />
          </Dialog>
        </Layer>
        <Mask
          visible={this.state.visible}
          title="Title"
          content="test"
          onOk={this.onOk}
          onCancel={this.onCancel}
        />
      </div>
    )
  }
}

ReactDOM.render(<Home />, document.getElementById('root'));
