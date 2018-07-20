//观察者模式（订阅发布模式）
class EmitterEvent {
    constructor() {
        // 构造器。实例上创建一个事件池
        this._event = {}
    }

    //订阅
    on(eventName, handler) {
        //根据eventName，事件池有对应的时间数组，就push添加。没有就创建一个
        //严谨点应该判断handler的类型是不是function
        let events = this._event[eventName];
        if (events) {
            events.push(handler);
        } else {
            this._event[eventName] = [handler];
        }
    }

    //解除订阅
    off(eventName, handler) {
        var events = this._event[eventName];
        if (events) {
            this._event[eventName] = events.filter(event => event !== handler)
        }
    }

    // 订阅以后，emit 发布执行一次后自动解除订阅
    once(eventName, handler) {
        var that = this;
        function func() {
            var args = Array.prototype.slice.call(arguments, 0);
            console.log(args);
            handler.apply(that, args);
            this.off(eventName, func);
        }
        this.on(eventName, func);
        //item.apply(this,args)
    }

    emit(eventName) {
        // 根据eventName找到对应数组
        var events = this._event[eventName];
        // 取一下传进来的参数，方便给执行的函数
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        var that = this;
        if (events && events.length) {
            //这里的this是window
            events.forEach(event => event.apply(that, otherArgs))
        }
    }

    //emit用于分发消息
    // emit(eventName, ...args) {
    //     const events = this._event[eventName];
    //     if (events && events.length) {
    //         for (const event of events) {
    //             event(...args)
    //         }
    //     }
    // }
}

const event = new EventEmitter;
export { event };