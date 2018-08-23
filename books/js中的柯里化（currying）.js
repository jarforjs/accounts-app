//官员娶老婆的例子
var currying = function(fn) {
    // fn 指官员消化老婆的手段
    var args = [].slice.call(arguments, 1);
    // args 指的是那个合法老婆
    return function() {
        // 已经有的老婆和新搞定的老婆们合成一体，方便控制
        var newArgs = args.concat([].slice.call(arguments));
        // 这些老婆们用 fn 这个手段消化利用，完成韦小宝前辈的壮举并返回
        return fn.apply(null, newArgs);
    };
};

// 下为官员如何搞定7个老婆的测试
// 获得合法老婆
var getWife = currying(function() {
    var allWife = [].slice.call(arguments);
    // allwife 就是所有的老婆的，包括暗渡陈仓进来的老婆
    console.log(allWife.join(";"));
}, "合法老婆");

// 获得其他6个老婆
getWife("大老婆","小老婆","俏老婆","刁蛮老婆","乖老婆","送上门老婆");

// 换一批老婆
getWife("超越韦小宝的老婆");

//声明getWife函数表达式的时候，把匿名函数已实参的形式传进了currying函数，实质getWife的返回值其实是currying函数的返回值，通过闭包的形式把args的值确定下来了："合法老婆"
//当运行到22行的时候，代码真正执行，他的执行结果是第5行返回值，现在newArgs等于之前的args.concat后来的arguments
//有了newArgs，代码执行到第九行执行匿名函数fn，并将newArgs传入，打印出neweArgs（args+getWife的实参）

//大小柯南的例子
var smallKenan = function(action) {
    var bigKenan = function(doing) {
        var result = "";
        if (action === "take drugs") {
            if (doing === "bathWithGirlFriend") {
                result = "尖叫，新一，你这个色狼，然后一巴掌，脸煮熟了~";
            } else if (doing === "pointOutKiller") {
                result = "新一，这个案子就交给你的，快点找出谁是凶手吧~";
            }
        } else {
            if (doing === "bathWithGirlFriend") {
                result = "来吧，柯南，一起洗澡吧~";
            } else if (doing === "pointOutKiller") {
                result = "小孩子家，滚一边去！";
            }
        }
        console.log(result);
        return arguments.callee; // 等同于return bigKenan
    };
    return bigKenan;
};

// 小柯南吃药了，然后和毛利兰洗澡，凶案现场指证犯人；结果是……

//“吃药”、“洗澡”、“指出凶手”就可以看成三个参数，其中，“吃药”确实是小柯南使用的，而后面的是“洗澡”、“指出凶手”虽然跟在smallKenan()后面，实际上是大柯南使用的。这个就是柯里化，参数部分使用。外部函数处理部分应用，剩下的由外部函数的返回函数处理。

// 计算1个月4周钓鱼量
//不用柯里化
var fishWeight = 0;
var addWeight = function(weight) {
    fishWeight += weight;
};

addWeight(2.3);
addWeight(6.5);
addWeight(1.2);
addWeight(2.5);

console.log(fishWeight);   // 12.5

//用柯里化
var curryWeight = function(fn) {
    var _fishWeight = [];
    return function() {
        if (arguments.length === 0) {
            return fn.apply(null, _fishWeight);
        } else {
            _fishWeight = _fishWeight.concat([].slice.call(arguments));
        }
    }
};
var fishWeight = 0;
var addWeight = curryWeight(function() {
    var i=0; len = arguments.length;
    for (i; i<len; i+=1) {
        fishWeight += arguments[i];
    }
});

addWeight(2.3);
addWeight(6.5);
addWeight(1.2);
addWeight(2.5);
addWeight();    //  这里才计算

console.log(fishWeight);    // 12.5
// 代码多就多在curryWeight方法里柯里化的复用

// 柯里化有3个常见作用：1. 参数复用；2. 提前返回；3. 延迟计算/运行。
// 通过柯里化来组合你的函数，你可以创建一个强大的数据处理管道。