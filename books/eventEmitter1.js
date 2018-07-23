import { event } from "./EmitterEvent";

// class EventEmitter {
//     constructor() {
//         this._event = {}
//     }

//     on(eventName, handler) {
//         let events = this._event[eventName];
//         if (events) {
//             events.push(handler)
//         } else {
//             this._event[eventName] = [handler]
//         }
//     }

//     off(eventName, handler) {
//         let events = this._event[eventName];
//         if (events) {
//             this._event[eventName] = events.filter(event => event !== handler)
//         }
//     }

//     once(eventName, handler) {
//         let that = this;
//         function func() {
//             var args = Array.prototype.slice.call(arguments, 0);
//             handler.apply(that, args);
//             this.off(eventName, func)
//         }
//         this.on(eventName, func);
//     }

//     emit(eventName) {
//         var events = this._event[eventName];
//         var otherArgs = Array.prototype.slice.call(arguments, 1);
//         var that = this;
//         if (events) {
//             events.forEach(event => event.apply(that, otherArgs))
//         }
//     }

//     emit(eventName, ...args) {
//         const events = this._event[eventName];
//         if (events && events.length) {
//             for (const event of events) {
//                 event(...args)
//             }
//         }
//     }
// }

// class EventEmitter {
//     constructor() {
//         this._event = {}
//     }

//     on(eventName, handler) {
//         let events = this._event[eventName];
//         if (events) {
//             events.push(handler)
//         } else {
//             this._event[eventName] = [handler]
//         }
//     }

//     off(eventName, handler) {
//         let events = this._event[eventName];
//         if (events) {
//             this._event[eventName] = events.filter(event => event !== handler)
//         }
//     }

//     once(eventName, handler) {
//         const that = this;
//         function func() {
//             const args = Array.prototype.slice.call(arguments, 0);
//             handler.apply(that, args);
//             this.off(eventName, func)
//         }
//         this.on(eventName, func)
//     }

//     emit(eventName) {
//         const events = this._event[eventName];
//         const otherArgs = Array.prototype.slice.call(arguments, 1);
//         const that = this;
//         if (events && events.length) {
//             events.forEach(event => event.apply(that, otherArgs));
//         }
//     }

//     emit(eventName, ...args) {
//         const events = this._event[eventName];
//         if (events && events.length) {
//             for (const event of events) {
//                 event(...args)
//             }
//         }
//     }
// }

// class EventEmitter {
//     constructor() {
//         this._events = {}
//     }

//     on(eventName, handler) {
//         let events = this._events[eventName];
//         if (events) {
//             events.push(handler)
//         } else {
//             this._events[eventName] = [handler]
//         }
//     }

//     off(eventName, handler) {
//         let events = this._events[eventName];
//         if (events) {
//             this._events[eventName] = events.filter(event => event !== handler)
//         }
//     }

//     once(eventName, handler) {
//         const that = this;
//         function func() {
//             const args = Array.prototype.slice.call(arguments, 0);
//             handler.apply(that, args);
//             this.off(eventName, func)
//         }
//         this.on(eventName, func)
//     }

//     emit(eventName) {
//         let events = this._events[eventName];
//         let otherArgs = Array.prototype.slice.call(arguments, 1);
//         const that = this;
//         if (events && events.length) {
//             events.forEach(event => event.apply(that, otherArgs))
//         }
//     }

//     emit(eventName, ...args) {
//         let events = this._events[eventName];
//         if (events && events.length) {
//             for (const event of events) {
//                 event(...args)
//             }
//         }
//     }
// }

<<<<<<< HEAD

class EventEmitter{
    constructor(){
        this._events={}
=======
class EventEmitter {
    constructor() {
        this._events = {}
>>>>>>> 071bc735c41b7b08a85333afc75b3a2c398c3be1
    }

    on(eventName,handler){
        let events=this._event[eventName];
        if(events){
            events.push(handler)
        }else{
            this._events[eventName]=[handler]
        }
    }

    off(eventName,handler){
        let events=this._events[eventName];
        if(events&&events.length){
            this._events[eventName]=events.filter(event=>event!==handler)
        }
    }

    once(eventName,handler){
        const that=this;
        function func() {
<<<<<<< HEAD
            const args=Array.prototype.slice.call(arguments,0)
            handler.apply(that,args)
            this.off(eventName,func)
=======
            const args = Array.prototype.slice.call(arguments, 0);
            handler.apply(that, args);
            this.off(eventName, func);
>>>>>>> 071bc735c41b7b08a85333afc75b3a2c398c3be1
        }
        this.on(eventName,func)
    }

<<<<<<< HEAD
    emit(eventName){
        let events=this._events[eventName];
        const args=Array.prototype.slice.call(arguments,1);
        const that =this;
        if(events&&events.length){
            events.forEach(event=>event.apply(that,args))
        }
    }

    emit(eventName,...args){
        const events=this._events[eventName];
        if(events&&events.length){
            for(const event of events){
=======
    emit(eventName) {
        const events = this._events[eventName];
        const args = Array.prototype.slice.call(arguments, 1);
        const that = this;
        if (events && events.length) {
            events.forEach(event => event.apply(that, args))
        }
    }

    emit(eventName, ...args) {
        const events = this._events[eventName];
        if (events && events.length) {
            for (const event of events) {
>>>>>>> 071bc735c41b7b08a85333afc75b3a2c398c3be1
                event(...args)
            }
        }
    }
}