** 加粗 **
* 斜体 *
~~ 删除线 ~~
` 底纹 `
[^1] 脚注
> 引用


# add a class constructor that assigns the initial this.state:
## Note how we pass props to the base constructor:
```
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```
Class components should always call the base constructor with props.

# The componentDidMount() hook runs after the component output has been rendered to the DOM. This is a good place to set up a timer:
```
 componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```
## Note how we save the timer ID right on this.

While this.props is set up by React itself and this.state has a special meaning, you are free to add additional fields to the class manually if you need to store something that doesn’t participate in the data flow (like a timer ID).

We will tear down the timer in the componentWillUnmount() lifecycle hook:
```
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

# State Updates May Be Asynchronous
React may batch multiple setState() calls into a single update for performance.

Because this.props and this.state may be updated asynchronously, you should not rely on their values for calculating the next state.

For example, this code may fail to update the counter:

// Wrong
```
  this.setState({
    counter: this.state.counter + this.props.increment,
  });
```
To fix it, use a second form of setState() that accepts a function rather than an object. That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument:
# 回调函数将接收先前的state作为第一个参数，并将应用更新时的props作为第二个参数：
// Correct
```
  this.setState((prevState, props) => ({
    counter: prevState.counter + props.increment
  }));
``` 
We used an arrow function above, but it also works with regular functions:

// Correct
```
  this.setState(function(prevState, props) {
    return {
      counter: prevState.counter + props.increment
    };
  });
```

In React apps, whether a component is stateful or stateless is considered an implementation detail of the component that may change over time. You can use stateless components inside stateful components, and vice versa.
在React应用程序中，组件是有状态还是无状态被视为可能随时间更改的组件的实现细节。 您可以在有状态组件内使用无状态组件，反之亦然。

// This binding is necessary to make `this` work in the callback
# 这个绑定是必要的，要不然该事件中的this就会是当前实例,而不是当前按钮
```
  this.handleClick = this.handleClick.bind(this);
```

# Passing Arguments to Event Handlers
Inside a loop it is common to want to pass an extra parameter to an event handler. For example, if id is the row ID, either of the following would work:
```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
The above two lines are equivalent**等价**, and use arrow functions and Function.prototype.bind respectively.

In both cases, the e argument representing**代表** the React event will be passed as a second argument after the ID. With an arrow function, we have to pass it explicitly**明确**, but with bind any further arguments are automatically forwarded.

# The best way to pick a key is to use a **string** that uniquely identifies a list item among its siblings.

`一个好的经验法则是哪里用到map(),哪里就要加上keys`
# A good rule of thumb is that elements inside the map() call need keys.

# Keys serve as a hint to React but they don’t get passed to your components. If you need the same value in your component, pass it explicitly as a prop with a different name:
# With the example above, the Post component can read props.id, but not props.key.

# But in most cases, it’s convenient**方便** to have a JavaScript function that handles the submission**服从** of the form and has access to the data that the user entered into the form. The standard way to achieve this is with a technique called “controlled components”.

# textarea
- In HTML, a <textarea> element defines its text by its children，In React, a <textarea> uses a value attribute instead.
e.g. <textarea value={this.state.value} />

# select
- Note that the Coconut option is initially selected, because of the selected attribute. React, instead of using this selected attribute, uses a value attribute on the root select tag. 
e.g. <select value={this.state.value}><option>其他</option></select>

# Overall, this makes it so that <input type="text">, <textarea>, and <select> all work very similarly - they all accept a value attribute that you can use to implement a controlled component.

# file input is an uncontrolled component

# Handling Multiple Inputs（操作多个input时）
```
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
```
```
  <form>
    <label>
      Is going:
      <input
        name="isGoing"
        type="checkbox"
        checked={this.state.isGoing}
        onChange={this.handleInputChange} />
    </label>
    <br />
    <label>
      Number of guests:
      <input
        name="numberOfGuests"
        type="number"
        value={this.state.numberOfGuests}
        onChange={this.handleInputChange} />
    </label>
  </form>
```

# Note how we used the ES6 computed property name syntax to update the state key corresponding to the given input name:
```
this.setState({
  [name]: value
});
```
- It is equivalent to this ES5 code:
```
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

# JSX removes whitespace at the beginning and ending of a line. It also removes blank lines. New lines adjacent to tags are removed; new lines that occur in the middle of string literals are condensed into a single space. So these all render to the same thing:
JSX会删除每行开头和结尾的空格，并且也会删除空行。邻接标签的空行也会被移除，字符串之间的空格会被压缩成一个空格，因此下面的渲染效果都是相同的：
```
<div>Hello World</div>

<div>
  Hello World
</div>

<div>
  Hello
  World
</div>

<div>

  Hello World
</div>
```

# When to Use Refs
There are a few good use cases for refs:

Managing focus, text selection, or media playback.
Triggering imperative animations.
Integrating with third-party DOM libraries.
老版本
```
<input type="text" ref={(input) => { this.textInput = input; }} />
```

新版本
```
<div ref={this.myRef} />;
var this.myRef = React.createRef()
this.myRef.current
```

# 转发refs
```
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```
通过这种方式，使用 FancyButton 的组件可以获得底层 button DOM 节点的引用并在必要时访问它 - 就像他们直接使用 DOM button 一样。

以下是对上述示例中发生情况逐步的说明：

- 我们通过调用 React.createRef 创建一个 React ref 并将其分配给 ref 变量。
- 通过将 ref 变量传递给指定ref为 JSX 属性的 <FancyButton ref={ref}>。
- React将ref传递给 forwardRef 中的 (props, ref) => ... 函数作为第二个参数。
- 我们将这个ref参数转发到指定ref为 JSX 属性的 <button ref = {ref}> 。
- 当附加 ref 时，ref.current 将指向 <button> DOM节点。

*注意*
第二个 ref 参数仅在使用 React.forwardRef 调用定义组件时才存在。常规函数或类组件不接收 ref 参数，而且 props 也不提供 ref 。
Ref 转发不限于 DOM 组件。您也可以将 refs 转发给类组件实例。

# context:Using context, we can avoid passing props through intermediate elements:
```
const ThemeContext = React.createContext('light');
App
<ThemeContext.Provider value="dark">
	<Toolbar />
<ThemeContext.Provider>

Toolbar
<ThemeButton />

ThemeButton
<ThemeContext.Consumer>
	{theme => <Button {...props} theme={theme} />}
<ThemeContext.Consumer>
```
Requires a function as a child. The function receives the current context value and returns a React node. The value argument passed to the function will be equal to the value prop of the closest Provider for this context above in the tree. If there is no Provider for this context above, the value argument will be equal to the defaultValue that was passed to createContext().

Note: passing undefined as a Provider value does not cause Consumers to use defaultValue.
传递undefined作为提供者不会导致消费者使用defaultValue

# 对于provider是对象时，每次重新渲染都会重新渲染所有consumer，为了防止这种结果，我们应该将value提升到父节点state里
```
<Provider value={{something: 'something'}}>
```
===》
this.state={
  value={something: 'something'}
}
<Provider value={this.state.value}>

# Fragments
A common pattern is for a component to return a list of children. Take this example React snippet:
```
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}
```
<Columns /> would need to return multiple <td> elements in order for the rendered HTML to be valid. If a parent div was used inside the render() of <Columns />, then the resulting HTML will be invalid.
```
class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Hello</td>
        <td>World</td>
      </div>
    );
  }
}
```

results in a <Table /> output of:
```
<table>
  <tr>
    <div>
		<td>Hello</td>
		<td>World</td>
    </div>
  </tr>
</table>
```

usage:
```
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```
which results in a correct <Table /> output of:
```
<table>
  <tr>
    <td>Hello</td>
    <td>World</td>
  </tr>
</table>
```