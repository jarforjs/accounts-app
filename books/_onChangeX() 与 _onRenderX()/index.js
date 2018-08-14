seajs.config({
    alias: {
        '$': 'jquery/jquery/1.7.2/jquery'
    }
});

seajs.use(['arale/widget/1.1.1/widget'], function(Widget) {
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
        }
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
        }, 6000);
    }, 6000);
});