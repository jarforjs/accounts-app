//发布订阅类
class EventEmitter {
    _event = {}

    //on函数用于绑定
    on(eventName, handler) {
        let listeners = this._event[eventName];
        if (!listeners || !listeners.length) {
            this._event[eventName] = [handler];
            return;
        }
        listeners.push(handler)
    }

    //off用于移除
    off(eventName, handler) {
        let listeners = this._event[eventName];
        this._event[eventName] = listeners.filter(l => l != handler);
    }

    //emit用于分发消息
    emit(eventName, ...args) {
        const listeners = this._event[eventName];
        if (listeners && listeners.length) {
            for (const l of listeners) {
                l(...args)
            }
        }
    }
}

const event = new EventEmitter;
export { event };
