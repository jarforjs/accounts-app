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