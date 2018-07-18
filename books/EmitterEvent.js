//观察者模式（订阅发布模式）
class EmitterEvent {
    constructor() {
        this._event = {}
    }

    on(eventName, handler) {
        //严谨点应该判断handler的类型是不是function
        if (this._event[eventName]) {
            this._event[eventName].push(handler);
        } else {
            this._event[eventName] = [handler];
        }
    }

    emit(eventName) {
        var events = this._event[eventName];
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        var that = this;
        if (events) {
            events.forEach((event) => {
                //这里的this是window
                event.apply(that, otherArgs);
            })
        }
    }

    off(eventName, handler) {
        var events = this._event[eventName];
        if (events) {
            this._event[eventName] = events.filter((event) => {
                return event !== handler;
            })
        }
    }

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
}