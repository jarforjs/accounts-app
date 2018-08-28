// 告诫
// 因为 context 使用引用标识来确定何时重新渲染， 当 Provider(提供者) 的父节点重新渲染时，有一些陷阱可能触发 Consumer(使用者) 无意渲染。 例如，下面的代码将在每次 Provider(提供者) 重新渲染时，会重新渲染所有 Consumer(使用者) ，因为总是为 value 创建一个新对象：

class App extends React.Component {
  render() {
    return (
      <Provider value={{something: 'something'}}>
        <Toolbar />
      </Provider>
    );
  }
}
// 为了防止这样, 提升 value 到父节点的 state 里:

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {something: 'something'},
    };
  }

  render() {
    return (
      <Provider value={this.state.value}>
        <Toolbar />
      </Provider>
    );
  }
}