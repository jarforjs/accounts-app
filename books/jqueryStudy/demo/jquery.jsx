/**
 * Created by Administrator on 2017-03-15.
 */
define(function (require, exports, module) {
    require('jQuery');
    //var iscroll = require('iscroll');


    window.onload = function () {
        var oBtn = document.getElementsByClassName('btn')[0];


        // 实例化第一个select下拉框;
        var sel = new select({
            width: '500px',
            title: '输入内容，可以缺省，可以自定义的',
            box: 'box2',
            //value: ['我是一条很长很长很长很长很长很长很长很长很长的下拉框的内容','我是第一条下拉框的内容', '我是第二条下拉框的内容', '我是第三条下拉框的内容', '我是第四条下拉框的内容', '我是第五条下拉框的内容', '我是第六条下拉框的内容', '我是第七条下拉框的内容', '我是第八条下拉框的内容', '我是第九条下拉框的内容', '我是第十条下拉框的内容'],
            value2:[{description: "电子商务交易纠纷的案由0", status: "VALID", partype: "cause_action", parcode: "trade_dispute0"},{description: "软件纠纷的案由1", status: "VALID", partype: "cause_action", parcode: "trade_dispute1"},{description: "软件纠纷的案由2", status: "VALID", partype: "cause_action", parcode: "trade_dispute2"},{description: "软件纠纷的案由3", status: "VALID", partype: "cause_action", parcode: "trade_dispute3"},{description: "软件纠纷的案由4", status: "VALID", partype: "cause_action", parcode: "trade_dispute4"},{description: "软件纠纷的案由5", status: "VALID", partype: "cause_action", parcode: "trade_dispute5"},{description: "软件纠纷的案由6", status: "VALID", partype: "cause_action", parcode: "trade_dispute9"},{description: "软件纠纷的案由7", status: "VALID", partype: "cause_action", parcode: "trade_dispute7"},{description: "软件纠纷的案由8", status: "VALID", partype: "cause_action", parcode: "trade_dispute8"}]
        });


        oBtn.onclick = function () {
            var value = sel.getValue();
            var index = sel.getIndex();
            var all = sel.getAll();
            console.log(all);
            document.getElementsByClassName('getValue')[0].value = 'getValue取的值是：' + value;
            document.getElementsByClassName('getIndex')[0].value = 'getIndex取的index是：' + index;
            document.getElementsByClassName('getAll')[0].innerHTML = 'getAll取得值是(getAll.value)：' + all.value + '</br>' + 'getAll取得值是(getAll.index)：' + all.index;
        };


        /*
         // 实例化第二个select下拉框;
         var sel2 = new select({
         //            width : '400px',   // width缺省默认为 300px;
         title: '输入内容，可以缺省，可以自定义的',  // title缺省默认内容为 ：请选择内容;
         box: 'box',  // box缺省默认添加到body上;
         value: ['第一项', '第二项', '第三项', '第四项', '第五项', '第六项', '第二项', '第三项', '第四项', '第五项', '第六项', '第二项', '第三项', '第四项', '第五项', '第六项', '第二项', '第三项', '第四项', '第五项', '第六项']  // value缺省不会生成select下拉框;
         });


         // 大部分值都缺省的情况;
         var sel3 = new select({
         value: ['人生若只如初见', '何事秋风悲画扇','第一项', '第二项', '第三项', '第四项', '第五项', '第六项', '第二项', '第三项', '第四项', '第五项', '第六项', '第二项', '第三项', '第四项', '第五项', '第六项', '第二项', '第三项', '第四项', '第五项', '第六项']
         });
         */
    };


    function select(Json) {
        this.Json = Json;
        this.seWidth = this.Json.width || 300 + 'px';
        this.seTitle = this.Json.title || '请选择';
        this.seBox = document.getElementById(this.Json.box) || document.getElementsByClassName(this.Json.box)[0] || document.body;
        this.seValue = this.Json.value || [''];
        this.seValue2 = this.Json.value2 || [''];
        this.oTran = document.createElement('div');
        this.oSpan = document.createElement('span');
        this.oUl = document.createElement('ul');
        this.oI = document.createElement('i');
        this.oTt = document.createElement('tt');
        this.oLi = this.oUl.children;
        this.isOn = null;
        this.init();
        this.setValue();
        this.click();
    }
    select.prototype = {
        init: function () {
            var self = this;
            var oDiv = document.createElement('div');
            oDiv.className = 'select';
            oDiv.style.width = self.seWidth;
            oDiv.style.minWidth = 300 + 'px';
            self.oTran.className = 'tran';
            self.oI.className = 'square';
            self.oTt.className = 'rot0';
            self.oSpan.className = 'value';
            self.oSpan.innerHTML = self.seTitle;
            self.oSpan.setAttribute('value', self.seTitle);
            self.oSpan.setAttribute('index', null);
            self.oUl.className = 'selectBox';
            self.oUl.innerHTML = '';
            //console.log(this.seValue2);
            // for (var i = 0; i < this.seValue.length; i++) {
            //     if (this.seValue.length == 1 && this.seValue[0] == '')
            //         return;
            //     self.oUl.innerHTML += '<li value=' + self.seValue[i] + ' index=' + i + '>' + self.seValue[i] + '</li>';
            // }

            for(var value in this.seValue2){
                if(Object.prototype.hasOwnProperty.call(this.seValue2,value)){
                    if(this.seValue2.length==1&&this.seValue2=='')
                        return;
                    //console.log(this.seValue2[n]);
                    self.oUl.innerHTML+='<li value=' + this.seValue2[value].parcode + ' index=' + value + '>' + this.seValue2[value].description + '</li>';
                }
            }


            // $.each(this.seValue2,function(n,value) {
            //     if (this.length == 1 && this == '')
            //         return;
            //     // console.log(value);
            //     self.oUl.innerHTML += '<li value=' + value.parcode + ' index=' + n + '>' + value.description + '</li>';
            //     //trs += "<tr><td>" + n +"</td> <td>" + value.name + "</td> <td>" + value.password + "</td></tr>";
            //     //tbody += trs;
            // });

            self.oI.appendChild(self.oTt);
            self.oTran.appendChild(self.oSpan);
            self.oTran.appendChild(self.oI);
            oDiv.appendChild(self.oTran);
            oDiv.appendChild(self.oUl);
            self.seBox.appendChild(oDiv);
        },
        click: function () {
            var self = this;
            self.isOn = true;
            self.oTran.onclick = function () {
                if (self.isOn) {
                    self.show();
                } else {
                    self.hide();
                }
            }
        },
        show: function () {
            var self = this;
            self.oUl.style.display = 'block';
            self.addClass(self.oTt, 'rot180');
            self.removeClass(self.oTt, 'rot0');
            self.isOn = !self.isOn;
        },
        hide: function () {
            var self = this;
            self.oUl.style.display = 'none';
            self.addClass(self.oTt, 'rot0');
            self.removeClass(self.oTt, 'rot180');
            self.isOn = true;
        },
        setValue: function () {
            var self = this;
            for (var i = 0; i < self.oLi.length; i++) {
                self.oLi[i].onclick = (function (k) {
                    return function () {
                        self.oSpan.innerHTML = self.oLi[k].innerHTML;
                        // self.oSpan.setAttribute('value', self.oSpan.innerHTML);
                        self.oSpan.setAttribute('value', self.oLi[k].getAttribute('value'));
                        self.oSpan.setAttribute('index', self.oLi[k].getAttribute('index'));
                        self.hide();
                    }
                })(i)
            }
        },
        getIndex: function () {
            var self = this;
            this.setValue();
            return self.oSpan.getAttribute('index');
        },
        getValue: function () {
            var self = this;
            this.setValue();
            return self.oSpan.getAttribute('value');
        },
        getAll: function () {
            var self = this;
            this.setValue();
            var val = {
                // value: self.oSpan.innerHTML,
                value: self.oSpan.getAttribute('value'),
                index: self.oSpan.getAttribute('index')
            };
//            value = JSON.stringify(value);
            return val;
        },
        addClass: function (obj, name) {
            var classArr = obj.className.split(' ');
            for (var i = 0; i < classArr.length; i++) {
                if (classArr[i] == name)
                    return
            }
            if (obj.className)
                obj.className += ' ' + name;
            else
                obj.className = name;
        },
        removeClass: function (obj, name) {
            var classArr = obj.className.split(' ');
            for (var i = classArr.length - 1; i >= 0; i--) {
                if (classArr[i] == name)
                    classArr.splice(i, 1);
            }
            obj.className = classArr.join(' ');
        }
        /*
         // 没用jq 本来想做个jq那种 toogleslide 那种效果的,无奈功力不够，而且太麻烦了，直接用的block，none来写吧，
         move : function(obj,Json,time,cv,callBack){
         if (typeof cv == 'undefined'){
         time = time || 400;
         cv = 'linear';
         }
         if (typeof time == 'string'){
         callBack = cv;
         cv = time;
         time = 400;
         }else if (typeof time == 'number' && typeof cv == 'function'){
         callBack = cv;
         cv = 'linear';
         }else if (typeof time == 'function'){
         callBack = time;
         time = 400;
         cv = 'linear';
         }
         // b iB 初始位置 left width等等; json值;
         var iB = {};
         // 时间变化量 (开始时间);
         var starTime = (new Date()).getTime();
         for(var key in Json){
         iB[key] = parseInt(getStyle(obj,key));
         };
         // c iC 属性变化量;
         var iC = {};
         for(var key in Json){
         // 变化量 减去 初始量 取整;
         parseInt(Json[key] - iC[key])
         };
         // 时间变化量;
         obj.stop = setInterval(function(){
         var nowTime = (new Date()).getTime();
         var t = Math.min(nowTime - starTime,time);
         for(var key in Json){
         // 调用 Tween 运动函数,不确定的值用中括弧([])表示,传入四个参数 (t,b,c,d);
         var value = Tween[cv](t,iB[key],parseInt(Json[key])-iB[key],time);
         obj.style[key] = value + 'px';
         };
         if(t == time){
         clearInterval(obj.stop);
         callBack && callBack.call(obj);
         }
         },13);
         function getStyle(obj,attr){
         return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
         };
         },


         // Tween 运动曲线扩展
         Tween : {
         linear: function (t, b, c, d){  //匀速
         return c*t/d + b;
         },
         easeIn: function(t, b, c, d){  //加速曲线
         return c*(t/=d)*t + b;
         },
         easeOut: function(t, b, c, d){  //减速曲线
         return -c *(t/=d)*(t-2) + b;
         },
         easeBoth: function(t, b, c, d){  //加速减速曲线
         if ((t/=d/2) < 1) {
         return c/2*t*t + b;
         }
         return -c/2 * ((--t)*(t-2) - 1) + b;
         },
         easeInStrong: function(t, b, c, d){  //加加速曲线
         return c*(t/=d)*t*t*t + b;
         },
         easeOutStrong: function(t, b, c, d){  //减减速曲线
         return -c * ((t=t/d-1)*t*t*t - 1) + b;
         },
         easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
         if ((t/=d/2) < 1) {
         return c/2*t*t*t*t + b;
         }
         return -c/2 * ((t-=2)*t*t*t - 2) + b;
         },
         elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
         if (t === 0) {
         return b;
         }
         if ( (t /= d) == 1 ) {
         return b+c;
         }
         if (!p) {
         p=d*0.3;
         }
         if (!a || a < Math.abs(c)) {
         a = c;
         var s = p/4;
         } else {
         var s = p/(2*Math.PI) * Math.asin (c/a);
         }
         return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
         },
         elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
         if (t === 0) {
         return b;
         }
         if ( (t /= d) == 1 ) {
         return b+c;
         }
         if (!p) {
         p=d*0.3;
         }
         if (!a || a < Math.abs(c)) {
         a = c;
         var s = p / 4;
         } else {
         var s = p/(2*Math.PI) * Math.asin (c/a);
         }
         return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
         },
         elasticBoth: function(t, b, c, d, a, p){
         if (t === 0) {
         return b;
         }
         if ( (t /= d/2) == 2 ) {
         return b+c;
         }
         if (!p) {
         p = d*(0.3*1.5);
         }
         if ( !a || a < Math.abs(c) ) {
         a = c;
         var s = p/4;
         }
         else {
         var s = p/(2*Math.PI) * Math.asin (c/a);
         }
         if (t < 1) {
         return - 0.5*(a*Math.pow(2,10*(t-=1)) *
         Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
         }
         return a*Math.pow(2,-10*(t-=1)) *
         Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
         },
         backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
         if (typeof s == 'undefined') {
         s = 1.70158;
         }
         return c*(t/=d)*t*((s+1)*t - s) + b;
         },
         backOut: function(t, b, c, d, s){
         if (typeof s == 'undefined') {
         s = 3.70158;  //回缩的距离
         }
         return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
         },
         backBoth: function(t, b, c, d, s){
         if (typeof s == 'undefined') {
         s = 1.70158;
         }
         if ((t /= d/2 ) < 1) {
         return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
         }
         return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
         },
         bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
         return c - this['bounceOut'](d-t, 0, c, d) + b;
         },
         bounceOut: function(t, b, c, d){
         if ((t/=d) < (1/2.75)) {
         return c*(7.5625*t*t) + b;
         } else if (t < (2/2.75)) {
         return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
         } else if (t < (2.5/2.75)) {
         return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
         }
         return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
         },
         bounceBoth: function(t, b, c, d){
         if (t < d/2) {
         console.log( this );
         return this['bounceIn'](t*2, 0, c, d) * 0.5 + b;
         }
         return this['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
         }
         }
         */
    };


});
