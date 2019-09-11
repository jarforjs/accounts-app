import React from 'react';

class QrCode extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickQr = this.handleClickQr.bind(this);

    this.state = {
      active: false,
    }
  }

  componentDidMount() {
    document.body.addEventListener('click', e => {
      if (e.target && e.target.matches('.qr')) {
        return;
      }
      alert('addEventListener click')
      this.setState({
        active: false,
      })
    })

    //如果想在结果处也屏蔽addEventListener click,可以这样：
    // react 合成事件, dispatchEvent里面执行回调函数
    // document.addEventListener('click', dispatchEvent);

    // 浏览器原生
    // document.addEventListener('click', () => {
    //   alert('document click');
    // })
    document.querySelector('.code').addEventListener('click', e => {
      console.log('querySelector click')
      e.stopPropagation();
    })

    // 注意：
    // 在点测试click事件的时候，触发的顺序是：
    // 结果：原生outClick -> addEventListener click -> onClick -> (outClick因为是合成事件，被onClick中的stop给阻止了)
    document.getElementById('div1').addEventListener('click', () => {
      alert('原生outClick');
    })
  }

  componentWillUnmount() {
    document.body.removeEventListener('click');
    document.querySelector('.code').removeEventListener('click');
    document.querySelector('.div1').removeEventListener('click');
  }

  handleClick() {
    console.log('handleClick')
    this.setState({
      active: !this.state.active,
    })
  }

  handleClickQr(e) {
    // 注意：
    // React有自己的一套事件处理机制，它会将所有的事件都绑定在document上，然后再用dispatchEvent统一分发，这时候分发的是合成事件。
    // handleClickQr(e)这时候拿到的e其实是合成事件，只能阻止合成事件的冒泡。
    console.log('hanleClickQr')
    // e.stopPropagation();
  }

  outClick(e) {
    console.log(e.currentTarget);
    alert('合成outClick');
  }

  onClick(e) {
    console.log(e.currentTarget);
    alert('onClick');
    e.stopPropagation();
  }

  render() {
    return (
      <div>
        <button className='qr' onClick={this.handleClick}>二维码</button>
        <div
          className='code'
          style={{ display: this.state.active ? 'block' : 'none' }}
          onClick={this.handleClickQr}
        >
          <img src='https://img.alicdn.com/tfs/TB1TKeux3HqK1RjSZFPXXcwapXa-282-150.png' alt="qr" />
        </div>

        <div id="div1" onClick={this.outClick}>
          <button onClick={this.onClick}> 测试click事件 </button>
        </div>
      </div>
    )
  }
}

export default QrCode;