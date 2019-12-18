<CountDown startCount={10}>
    {
        (count) => <div>{count > 0 ? count : '新年快乐！'}</div>
    }
</CountDown>

//Lambda表达式等于每次渲染都会重新定义一个新的函数，这就要求使用CountDown的地方不能使用匿名函数
//定义一个showCount函数
function showCount(count){
    return <div>{count}</div>
}

//然后CountDown就可以把showCount作为子组件使用
<CountDown startCount={10}>
    {showCount}
</CountDown>