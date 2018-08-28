//发布订阅类
class EventEmitter {
    _event = {}

    //on函数用于绑定
    on(eventName, handler) {
        let events = this._event[eventName];
        if (!events || !events.length) {
            this._event[eventName] = [handler];
            return;
        }
        events.push(handler)
    }

    //off用于移除
    off(eventName, handler) {
        let events = this._event[eventName];
        this._event[eventName] = events.filter(events => events !== handler);
    }

    //emit用于分发消息
    emit(eventName, ...args) {
        const events = this._event[eventName];
        if (events && events.length) {
            for (const event of events) {
                event(...args)
            }
        }
    }
}

const event = new EventEmitter;
export { event };
