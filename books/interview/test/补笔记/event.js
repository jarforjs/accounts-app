/**
 * Created by Jeawon on 2016/5/23.
 */
function on(ele, type, fn) {
    if (/^self/.test(type)) {//判断是否是自定义事件
        if (!ele[type]) {
            ele[type] = [];
        }
        var a = ele[type];
        for (var i = 0; i < a.length; i++) {
            if (a[i] == fn)return;
        }
        a.push(fn);
    } else {
        if (ele.addEventListener) {
            ele.addEventListener(type, fn, false);
        } else {
            if (!ele["aEvent" + type]) {
                ele["aEvent" + type] = [];
                ele.attachEvent("on" + type, function () {
                    run.call(ele)
                });
            }
            var a = ele["aEvent" + type];
            for (var i = 0; i < a.length; i++) {
                if (a[i] == fn)return;
            }
            a.push(fn);
        }
    }
}

function run() {//run只是解决系统事件
    var e = window.event;
    var type = e.type;
    if (!e.target) {
        e.target = e.srcElement;
        e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
        e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
        e.preventDefault = function () {
            e.returnValue = false
        };
        e.stopPropagation = function () {
            e.cancelBubble = true
        };
    }
    //run方法是由事件驱动的,所以下面数组中的type是动态得到的.只有上面var了一个type,那下面这个type才能真正得到事件类型了,真正的把对应的数组取到.
    var a = this["aEvent" + type];
    if (a && a.length) {
        for (var i = 0; i < a.length;) {
            if (typeof a[i] != "function") {
                a.splice(i, 1);
            } else {
                a[i].call(this, e);
                i++;
            }
        }
    }
}

function fire(selfType, e) {//第一个参数是自定义事件的类型,第二个参数浏览器的事件对象
    var a = this[selfType];
    if (a && a.length) {
        for (var i = 0; i < a.length;) {
            if (typeof a[i] == "function") {
                a[i].call(this, e);
                i++;
            } else {
                a.splice(i, 1);
            }
        }
    }
}

function off(ele, type, fn) {
    if (/^self/.test(type)) {
        var a = ele[type];
        if (a && a.length) {
            for (var i = 0; i < a.length; i++) {
                a[i] = null;
                return;
            }
        }
    } else {
        if (ele.removeEventListener) {
            ele.removeEventListener(type, fn, false);
        } else {
            //var a = this["aEvent" + type];
            var a = ele["aEvent" + type];
            console.log(this);
            if (a && a.length) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i] == fn) {
                        //这边如果置空了,上面方法就要判断null是不是一个function,一定要把这三个方法内在的联系搞清楚
                        a[i] = null;
                        //因为一个方法只能在事件上绑定一次,你一旦置空了就让它return
                        return;
                    }
                }
            }
        }
    }
}

function processThis(obj, fn) {
    return function (e) {
        fn.call(obj, e);
    }
}