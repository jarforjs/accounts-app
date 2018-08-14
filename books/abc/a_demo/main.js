define(function(require, exports, module) {
    'use strict';
    require('./style.css');
    require('bus/global/main');
    var domUtil = require('common/domUtil');

    var MyWidget = require('common/myWidget');

// 基于 Widget 定义 SimpleTabView 组件
    var SimpleTabView = MyWidget.extend({
        attrs: {
            triggers: {
                value: '.nav li',
                getter: function(val) {
                    return this.$(val);
                },
                readOnly: true
            },
            panels: {
                value: '.content div',
                getter: function(val) {
                    return this.$(val);
                },
                readOnly: true
            },
            activeIndex: {
                value: null
            },
            size:{
                value:null
            }
        },
        events: {
            'click .nav li': '_switchToEventHandler'
        },
        // 提供了 _onRender + 属性名(首字母大写)的特性，在两种情况会触发:
        //     在属性改变的时候
        //     在调用 render 方法的时候(插入文档流之前)，但当属性值为 null 或 undefined 时则不会触发。
        _onRenderActiveIndex: function(val, prev) {
            var triggers = this.get('triggers');
            var panels = this.get('panels');
            triggers.eq(prev).removeClass('active');
            triggers.eq(val).addClass('active');
            panels.eq(prev).hide();
            panels.eq(val).show();
        },
        _switchToEventHandler: function(ev) {
            var index = this.get('triggers').index(ev.target);
            this.switchTo(index);
        },
        switchTo: function(index) {
            var panels = this.get('panels');
            panels.filter(function(_index){
                if(_index !== index){
                    panels.eq(_index).hide();
                }
            });
            this.set('activeIndex', index);
        },
        setup: function() {
            this.get('panels').hide();
            this.switchTo(this.get('activeIndex'))
        },
        add: function(title, content) {
            var li = $('<li>' + title + '</li>');
            var div = $('<div>' + content + '</div>');
            li.appendTo(this.get('triggers')[0].parentNode);
            div.appendTo(this.get('panels')[0].parentNode);
            this.set('size',this.get('triggers').length);
            return this;
        },
        setActiveContent: function(content) {
            this.get('panels').eq(this.get('activeIndex')).html(content);
        },
        size: function() {
            return this.get('triggers').length;
        }
    });
    var tabView = new SimpleTabView({
        element: '#demo',
        activeIndex: 0
    }).render();

    tabView.add('你好','我是内容');
    tabView.add('你好1','我是内容2');

    tabView.setActiveContent('我是后来设置的内容');

    // console.log(tabView.size())
    var counter = 1;
    $('#egg').on('click', function() {
        if (counter < 4) {
            tabView.add('哈哈', '你居然点击了 ' + counter++ + ' 次')
                    // .switchTo(tabView.attrs.size.value-1);
                    .switchTo(tabView.size() - 1);
        }
        else if (counter++ === 4) {
            tabView.setActiveContent('居然还点击');
        }
        else {
            tabView.element.replaceWith('带走了所有代码⋯⋯');
            $(this).remove();
        }
    });

    $('input[name="reset1"]').on('click',function () {
        $('#form1')[0].reset();
    })
    // $('input[name="reset1"]').click({name:"aty"},function(eventObj){
    //     console.dir(eventObj);
    //     console.log("params=" + eventObj.data);
    //     console.log("params=" + eventObj.data.name);
    // });


    var $submit=$("input[name=status][value=submit]");
    var $card_disputes=$("input[name=caseType][value=card_disputes]");
    $submit.prop('checked',true);
    $submit.closest('.JS-target-list').find('.JS-target-label').removeClass('child-focus');
    $submit.closest('.JS-target-label').addClass('child-focus');
    //选中信用卡纠纷
    $card_disputes.prop('checked',true);
    $card_disputes.closest('.JS-target-list').find('.JS-target-label').removeClass('child-focus');
    $card_disputes.closest('.JS-target-label').addClass('child-focus');

    //hash(arr,{'caseType':'card_disputes','status':'submit'})
    if(location.hash){
        var arr = location.hash.slice(1).split('&');
        hash(arr,{'caseType':'card_disputes','status':'submit'});
    }

    function hash(arr,obj) {
        domUtil.breakEachArr(arr,function (arrValue) {
            domUtil.breakEachObj(obj,function (objValue,key) {
                if(arrValue === objValue){
                    var $selector = $("input[name="+key+"][value="+objValue+"]");
                    $selector.prop('checked',true);
                    $selector.closest('.JS-target-list').find('.JS-target-label').removeClass('child-focus');
                    $selector.closest('.JS-target-label').addClass('child-focus');
                }
            })
        })
    }
});