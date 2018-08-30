/**
 * Created by Jeawon on 2016/4/19.
 */
/*
 *   在工作的过程中，导入其他框架或者方法需要放在head里,这个公共的工具文件，可能n个人共同编写，所以要区别开来
 * */
/*
 *   单例模式
 * */
var utils = {
            //类数组转数组
            listToArray: function (similarArray) {
                /*
                 *   try catch js中容错
                 * */
                var a = [];
                try {
                    a = Array.prototype.slice.call(similarArray); //根本就不支持ie7和ie8
                } catch (e) {
            //alert(); //ie7 和 ie8 弹出，
            a = [];
            for (var i = 0; i < similarArray.length; i++) {
                a[a.length] = similarArray[i];
            }
        }
        return a;
    },
    //把json格式字符串转化为json对象
    jsonParse: function (jsonStr) {
        return 'JSON' in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
    },
    //获取指定元素距离父级参照物偏移量
    offset: function (ele) {
        var eleLeft = ele.offsetLeft;
        var eleTop = ele.offsetTop;
        var eleParent = ele.offsetParent;
        var left = null;
        var top = null;
        left += eleLeft;
        top += eleTop;
        while (eleParent) {
            /*
             *  ps:在IE8中就不要加父级的边框了，IE8自己已经加过了。所以我们要判断当前浏览器是不是IE8:
             *      1、可以用正则：/MSIE (?:6|7|8)/.test(window.navigator.userAgent)
             *      2、用字符串的方法：window.navigator.userAgent.indexOf('MSIE 8.0') !== -1
             * */
            if (window.navigator.userAgent.indexOf('MSIE 8.0') !== -1) { //ie8
                left += eleParent.offsetLeft;
                top += eleParent.offsetTop;
            } else {
                left += eleParent.clientLeft + eleParent.offsetLeft;
                top += eleParent.clientTop + eleParent.offsetTop;
            }
            eleParent = eleParent.offsetParent;
        }
        return {left: left, top: top};
    },
    //读取dom元素，有第二个参数就赋值（js盒子模型只有scrollTop和scrollLeft是可读写的）
    getWin: function (attr, val) { //一个参数的时候是读取，两个参数可以赋值
        //if(typeof val !=='undefined')
        if (Object.prototype.toString.call(val)!=="[object Undefined]") {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
        return document.documentElement[attr] || document.body[attr];
    },
    //获取元素的浏览器计算后的样式:
    getCss: function (curEle, attr) {
        //处理带单位的问题
        var reg = /^(-?\d+\.?\d+)(?:px|em|pt|deg|rem|%)$/;
        var val = null;
        if (/MSIE (?:6|7|8)/.test(window.navigator.userAgent)) {
            //标准：opacity: .4;
            //非标准：filter: alpha(opacity=40);
            if (attr === 'opacity') {
                val = curEle.currentStyle[attr];
                var reg1 = /^alpha\(opacity=(\d+(\.\d+)?)\)/;
                //val=reg.test(val)?reg.exec(val)[1]/100:1;
                return reg1.test(val) ? RegExp.$1 / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }

        } else {
            val = window.getComputedStyle(curEle, null)[attr];
        }
        return reg.test(val) ? parseFloat(val) : val; //如果正则验证通过，寿命返回值是带单位的，那么我们就要人为去掉这个单位。否则不变
    }
};
/*
 //回调函数
 function a(callback){
 //烧水
 //烧开了
 if(typeof callback === 'function'){
 callback();
 }

 }
 */
