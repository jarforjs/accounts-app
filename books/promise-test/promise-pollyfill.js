(function(global,undefined){
    if(global.Promise)
        return
    function Promise(fn) {
        var state = 'pending',
            deferred = [],
            value, ret

        function resolve(newVal) {
            if (state !== 'pending')
                return
            if (newVal && typeof newVal.then === 'function') {
                newVal.then(resolve, reject)
                return
            }
            value = newVal
            state = 'resolved'
            while (deferred.length)
                handle(deferred.shift())
        }

        function reject(reason) {
            if (state !== 'pending')
                return
            if (reason && typeof reason.then === 'function') {
                reason.then(resolve, reject)
                return
            }
            value = reason
            state = 'rejected'
            while (deferred.length)
                handle(deferred.shift())
        }

        function handle(handler) {
            if (state === 'pending') {
                deferred.push(handler)
                return
            }
            try {
                if (state === 'resolved') {
                    if (!handler.onFullfilled)
                        handler.resolve(value)
                    else {
                        ret = handler.onFullfilled(value)
                        handler.resolve(ret)
                    }
                } else {
                    if (!handler.onRejected)
                        handler.reject(value)
                    else {
                        ret = handler.onRejected(value)
                        handler.reject(ret)
                    }

                }
            } catch (e) {
                handler.reject(e)
            }
        }

        this.then = function(onFullfilled, onRejected) {
            return new Promise(function(resolve, reject) {
                handle({
                    onFullfilled: onFullfilled,
                    onRejected: onRejected,
                    resolve: resolve,
                    reject: reject
                })
            })
        }

        this['catch'] = function(onRejected) {
            return this.then(undefined, onRejected)
        }

        fn(resolve, reject)
    }
    Promise.resolve = function(value) {
        var p = new Promise(function(resolve, reject) {
            resolve(value)
        })
        return p
    }
    Promise.reject = function(value) {
        var p = new Promise(function(resolve, reject) {
            reject(value)
        })
        return p
    }
    Promise.all = function(promiseArray) {
        var i, pro, len = promiseArray.length,
            result = []
        var p = new Promise(function(resolve, reject) {
            for (i = 0; i < len; i++) {
                pro = promiseArray[i]
                pro.then(function(v) {
                    result.push(v)
                }).then(function() {
                    if (result.length === len)
                        resolve(result)
                }).catch(function(e) {
                    result.push(e)
                    reject(e)
                })
            }
        })
        return p
    }
    Promise.race = function(promiseArray) {
        var i, pro, len = promiseArray.length,
            result = []

        var p = new Promise(function(resolve, reject) {
            for (i = 0; i < len; i++) {
                pro = promiseArray[i]
                pro.then(function(v) {
                    result.push(v)
                    resolve(result)
                })['catch'](function(e) {
                    reject(e)
                })
            }
        })
        return p
    }
    global.Pr1omise = Promise
})(this)