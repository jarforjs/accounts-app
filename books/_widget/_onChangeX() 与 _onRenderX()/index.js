seajs.config({
    alias: {
        '$': 'jquery/jquery/1.7.2/jquery'
    }
});

seajs.use(['arale/widget/1.1.1/widget','jquery/jquery/1.7.2/jquery'], function(Widget,$) {
    var MyWidget = Widget.extend({
        attrs: {
            class: null,
            count: 0
        },
        events: {
            'click': 'click'
        },
    
        click: function() {
            this.set('class', 'class-three');
            console.log(this.get("count"), my.get("class"));
        },
        _onChangeClass: function(val) {
            this.set('count', this.get('count') + 1);
        },
        _onRenderClass: function(val) {
            this.element.addClass(val);
        },
    });
    var my = new MyWidget({
        template: '<div style="background: #efefef;width: 100px;height: 100px;">text</div>'
    });
    my.set("class", "class-one");
    console.log(my.get("count"), my.get("class"));
    
    setTimeout(function() {
        my.render();
        console.log(my.get("count"), my.get("class"));
        
        setTimeout(function() {
            my.set("class", "class-two");
            console.log(my.get("count"), my.get("class"));
        }, 500);
    }, 1000);


    // var SimpleTabView = Widget.extend({

    //     attrs: {
    //         triggers: {
    //             value: '.nav li',
    //             getter: function (val) {
    //                 console.log(this)
    //                 return this.$(val);
    //             },
    //             readOnly: true
    //         },

    //         panels: {
    //             value: '.content div',
    //             getter: function (val) {
    //                 return this.$(val);
    //             },
    //             readOnly: true
    //         },

    //         activeIndex: {
    //             value: 0
    //         }
    //     },

    //     events: {
    //         'click .nav li': '_switchToEventHandler'
    //     },

    //     _onRenderActiveIndex: function (val, prev) {
    //         var triggers = this.get('triggers');
    //         var panels = this.get('panels');

    //         triggers.eq(prev).removeClass('active');
    //         triggers.eq(val).addClass('active');

    //         panels.eq(prev).hide();
    //         panels.eq(val).show();
    //     },

    //     _switchToEventHandler: function (ev) {
    //         var index = this.get('triggers').index(ev.target);
    //         this.switchTo(index);
    //     },

    //     switchTo: function (index) {
    //         this.set('activeIndex', index);
    //     },

    //     setup: function () {
    //         this.get('panels').hide();
    //         this.switchTo(this.get('activeIndex'))
    //     },

    //     add: function (title, content) {
    //         var li = $('<li>' + title + '</li>');
    //         var div = $('<div>' + content + '</div>');

    //         li.appendTo(this.get('triggers')[0].parentNode);
    //         div.appendTo(this.get('panels')[0].parentNode);

    //         return this;
    //     },

    //     setActiveContent: function (content) {
    //         this.get('panels').eq(this.get('activeIndex')).html(content);
    //     },

    //     size: function () {
    //         return this.get('triggers').length;
    //     }
    // });

    // var tabView = new SimpleTabView({
    //     element: '#demo',
    //     activeIndex: 0
    // }).render();

    // // 彩蛋：增加一点小趣味
    // var counter = 1;

    // $('#egg').on('click', function() {
    //     if (counter < 4) {
    //         tabView.add('哈哈', '你居然点击了 ' + counter++ + ' 次')
    //                 .switchTo(tabView.size() - 1);
    //     }
    //     else if (counter++ === 4) {
    //         tabView.setActiveContent('囧，你居然还点击，手真贱呀');
    //     }
    //     else {
    //         tabView.element.replaceWith('悄悄的我走了，带走了所有代码⋯⋯');
    //         $(this).remove();
    //     }
    // });

});