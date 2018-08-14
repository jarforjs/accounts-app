define(function(require, exports, module) {
    'use strict';
    require('./base.css');
    var MyMidget = require('common/myWidget');

    var A = MyMidget.extend({
        events:{
            'click h3':'heading',
            'mouseover p':'paragraph'
        },
        heading:function(){
            this.$('h3').html('标题被点击了/');
        },
        paragraph:function(){
            this.$('p').css('background-color','red');
        }
    });

    var a = new A({element:'#example1'});

    //a.animate()
});