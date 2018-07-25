# 默认值生效的条件是，对象的属性值严格等于undefined。

var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null

# 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。

let {length : len} = 'hello';

# 很多时候都会看到三个点(...)的存在,它在ES6语法中，有两种应用形式，分别为函数中的rest参数，以及扩展运算符

# 剩余参数和 arguments对象的区别
- 剩余参数和 arguments对象之间的区别主要有三个：
- 剩余参数只包含那些没有对应形参的实参，而 arguments 对象包含了传给函数的所有实参。
- arguments对象不是一个真正的数组，而剩余参数是真正的 Array实例，也就是说你能够在它上面直接使用所有的数组方法，比如 sort，map，forEach或pop。
- arguments对象还有一些附加的属性 （如callee属性）。

 **ES6的扩展运算符则可以看作是rest参数的逆运算。可以将数组转化为参数列表。**