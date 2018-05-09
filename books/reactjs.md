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