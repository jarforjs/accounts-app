// 做个 Reverse && UpperCase 的 demo

// 1. usual
const str = 'hello world';
const upperCase = str => str.toUpperCase();

const reverse = str => str.split('').reverse().join('');

// console.log(upperCase(reverse(str)));

// 2. reduce
// first simple
const result0 = [reverse, upperCase].reduce((res, cur) => {
  return cur(res);
}, str);

// 3. 然后 reduce 的 functor 可以提取出来，形参叫 state， action 更直观
const reducer = (state, action) => action(state);
const result1 = [reverse, upperCase].reduce(reducer, str);

// 4. 更进一步我们把参数也放到 funcs 数组的第一项，让 reduce 自动传入

const result2 = [str, reverse, upperCase].reduce(reducer);

// 5. 不太优雅，柯理化改造

const reverseUpper = args => [args, reverse, upperCase].reduce(reducer);
const result3 = reverseUpper(str);

// 6. 提取一个公共的方法，去处理函数组合， 以及参数的传入
const compose = (...funcs) => args => funcs.reduce(reducer, args);
const result4 = compose(reverse, upperCase)(str);

//莞式的一种实现
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  const last = funcs[funcs.length - 1]
  const rest = funcs.slice(0, -1)
  return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
}

//redux source
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

function func1(num) {
  console.log('func1 获得参数 ' + num);
  return num + 1;
}

function func2(num) {
  console.log('func2 获得参数 ' + num);
  return num + 2;
}
  
function func3(num) {
  console.log('func3 获得参数 ' + num);
  return num + 3;
}
var re2 = compose(func3, func2, func1)(0);


// const str = 'hello world';
// const upperCase = str => str.toUpperCase();
// const reverse = str => str.split('').reverse().join('');
// const reducer = (state, action) => action(state);
// const compose = (...funcs) => args => funcs.reduce(reducer, args);
// const result4 = compose(reverse, upperCase)(str);

// const reducer = (state, action) => action(state);
var sunYongJian = function reducer1(state, action) {
  return action(state);
};

//const source = (a, b) => (...args) => a(b(...args))
var reduxSource = function reducer(a, b) {
  return function () {
    return a(b.apply(undefined, arguments));
  };
};