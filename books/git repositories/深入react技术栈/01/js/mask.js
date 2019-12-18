import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const styles = {
  mask: {
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    height: '100%',
    zIndex: 1000,
  },
  modalWrap: {
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 1000,
  },
  modal: {
    fontSize: 14,
    padding: 20,
    width: 520,
    height: 200,
    margin: '100px auto 0',
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
    textAlign: 'center',
  },
  btnGroup: {
    padding: 10,
    textAlign: 'right'
  }
};

class Mask extends Component {
  constructor(props) {
    super(props);

    this.modal = null;
  }

  componentDidMount() {
    this.modal = document.createElement('div');
    this.props.visible && document.body.appendChild(this.modal);

    this._renderLayer();
  }

  componentDidUpdate() {
    if (this.props.visible) {
      document.body.appendChild(this.modal);
      this._renderLayer();
    } else {
      // todo: 有点问题
      this.modal.parentNode && this.modal.parentNode.removeChild(this.modal);
    }
  }

  onCancel = () => {
    const { onCancel } = this.props;
    (onCancel instanceof Function) && onCancel();
  }

  onOk = () => {
    const { onOk } = this.props;
    (onOk instanceof Function) && onOk();
  }

  // 渲染模态框内容
  _renderLayer() {
    const { title, content } = this.props;

    let JSXdom = (
      <div>
        <div style={styles.mask} />
        <div style={styles.modalWrap}>
          <div style={styles.modal}>
            <h2>{title}</h2>
            <p>{content}</p>
            <div style={styles.btnGroup}>
              <input type="button" onClick={this.onCancel} value="取消" />
              <input type="button" onClick={this.onOk} value="确定" />
            </div>
          </div>
        </div>
      </div>
    );

    ReactDOM.render(JSXdom, this.modal);
  }

  render() {
    return null;
  }
}

export default Mask;