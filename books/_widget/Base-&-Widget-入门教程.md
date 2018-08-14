## 索引

- [Base](#base)
  - [是什么](#base-what)
  - [Class](#base-class)
  - [Events](#base-events)
  - [Aspect](#base-aspect)
  - [Attribute](#base-attribute)
      - [如何定义](#base-attribute-how)
      - [Attribute 的读写操作](#base-attribute-rw)
  - [生命周期](#base-life-circle)
  - [使用场景](#base-usage)
  - [推荐范例](#base-example)

- [Widget](#widget)
  - [是什么](#widget-what)
  - [生命周期](#widget-life-circle)
  - [初始化](#widget-init)
      - [this.cid](#widget-init-cid)
      - [父类初始化](#widget-init-parent)
      - [this.element](#widget-init-element)
      - [this.initProps()](#widget-init-props)
      - [this.events](#widget-init-events)
      - [this.setup()](#widget-init-setup)
  - [this.render()](#widget-render)
      - [why?](#widget-render-why)
      - [样式隔离](#widget-render-style)
      - [_onChangeX() 与 _onRenderX()](#widget-render-cr)
  - [this.destroy()](#widget-destroy)
  - [其他方法](#widget-others)
      - [this.$(selector)](#widget-others-selector)
      - [this.delegateEvents()](#widget-others-delegate)
      - [Widget.query()](#widget-other-query)
      - [Widget.autoRenderAll() 与 Widget.autoRender()](#widget-other-auto)
  - [使用场景](#widget-usage)
  - [推荐范例](#widget-example)

<a name="base"></a>
## Base

<a name="base-what"></a>
### 是什么

> 基础类, 集成了 `Class`, `Attribute`, `Events`, `Aspect` 这四部分的所有特性.
> 一旦自定义类继承了 Base, 你就可以使用这四部分提供的所有 API.
> 
> 接下来, 简单地介绍下这四部分.

<a name="base-class"></a>
### Class

提供简洁的 OO 实现.

```js
// 1) 创建一个类
var SomeClass = Class.create({
    // 扩展自哪个类
    Extends: Animal,
    // 把别人的方法和属性搬过来放到 SomeClass.prototype 上
    Implements: Flyable,
    // 类的静态属性, 放到 SomeClass 上
    Statics: {
        COLOR: 'red'
    },
    // 初始化, 会在实例化对象时自动调用
    initialize: function() {
    }
});
// see: http://jsfiddle.net/lizziesky/YjtUs/4/

// 2) Class.create(parent, {}) 的 parent 参数等价于上面例子中的 Extends
var SomeClass = Class.create(Animal, {});

// 3) Class 创建出来的类具有 extend 方法, 可再次扩展出其他子类
var OtherClass = SomeClass.extend({
    // 覆盖父类方法
    initialize: function() {
        // 注意: 需要手工调用父类的初始化过程
        OtherClass.superclass.initialize.call(this);
        
        // do my stuff
    },
    // 也可以覆盖父类的 Implements, Statics 等
    Implements: Swimming,
    Statics: {
        COLOR: 'green',
        WIDTH: 1
    }
});

// 4) Class 创建出来的类具有 implement 方法, 作用是和定义类时的 Implements 相同, 
// 将其他对象的方法原样搬过来.
SomeClass.implement({
     method1: function () {}
});

// 5) Class(fn) 将现有 Function 对象转成 Class 类.
var EmptyClass = Class(function() {});
```

Base 类就是用 `Class.create` 创建, Implements 了 `Events`, `Attribute`, `Aspect` 这三部分.
另外, Base 增加了 `destroy` 方法, 相对于 `initialize` , 主要用于处理在实例销毁时的扫尾工作.

<a name="base-events"></a>
### Events

> 提供基本的事件添加, 移除和触发功能.

继承自 Base 的类, 自动具有 Events 的这三个 API:

- `obj.on(event, callback, [context])` 添加事件
- `obj.off([event], [callback], [context])` 移除事件
- `obj.trigger(event, [*args])` 触发事件


<a name="base-aspect"></a>
### Aspect

简单提供了两个 API:

- `obj.before(methodName, callback, [context])` 在 obj.methodName 执行之前先执行 callback
- `obj.after(methodName, callback, [context])` 在 obj.methodName 执行之后再执行 callback

注意点:

- before 的 callback 若返回 `false`, 会阻止原函数的执行.
- before 和 after 是按注册的先后顺序执行的, 先注册先执行.

<a name="base-attribute"></a>
### Attribute

> 对类属性的统一管理.

首先, 类的 attribute 和 property 虽然都可翻译成属性, 但我们要着重说明下两者的不同概念和使用场景:

- attribute 是指存储在类 attrs 对象中的, 通过 get/set 接口来读写的属性, 一般是可以外部传入的配置属性;
- property 是指直接放在实例上的, 可直接读写的公共或私有属性, 可以是临时变量, 如 obj._originStyle, 也可以是需要暴露出去的关键属性, 如 obj.element, obj.length 等

推荐是使用 attribute 来统一定义和管理类属性.

<a name="base-attribute-how"></a>
#### 如何定义

1) 统一定义在类的 `attrs` 对象上.

```js
Base.extend({
    attrs: {
        attr1: 1
    }
});
```

2) 几种定义方式:

```js
{
    // 方式一: 直接设置默认值
    attr1: "aString",

    // 方式二: 通过 value 设置默认值, 等价于方式一
    attr2: {
        value: "bString"
    },

    // 方式三: 设置 setter
    attr3: {
        value: "cString",
        // setter 会在实例调用 set() 时触发, 可以在此时做些处理,
        // 比如强制类型转换
        // 即当 obj.set("attr3", 1) 后, 会调用 setter, 转换成 '1'
        // setter 的 this 为当前实例
        setter: function(v) {
            return v + ""
        }
    },

    // 方式四: 设置 getter
    attr4: {
        value: 10,
        // getter 会在实例调用 get() 时触发, 同样可以在此时做些处理,
        // 比如存的是美元, 转成人民币
        // 即当 obj.get("attr4") 后, 会调用 getter
        // getter 的 this 为当前实例
        getter: function(v) {
            // 美元 * 汇率 = 人民币
            return v * 6.8
        }
    },

    // 方式五: readOnly 只读属性
    attr5: {
        value: 0,
        // 设置 readOnly 之后, 没法通过 obj.set() 的方式设置值, 即不可更改属性值
        // 但可以设置 getter 来调整
        // 默认 readOnly 为 false
        readOnly: true,
        getter: function() {
            return Math.ceil(this.get('panels').length / this.get('step'));
        }
    }
}
```

3) 设置 `propsInAttrs` 之后, 会把 `attrs` 中同名的 attribute 直接添加到 `this` 上.
```js
Base.extend({
    propsInAttrs: ['element'],
    attrs: {
        element: null
    }
});

// 即当初始化后 this.element = this.get('element')
// 注意: 初始化后 this.element 等于 this.get('element'), 但之后再设置各自值, 不会相互同步
```


<a name="base-attribute-rw"></a>
#### Attribute 的读写操作

1) `obj.set(key, value, options)` 设置某个属性的值, 并触发 `change:x` 事件.

- options.silent: 默认为 `false`. `true` 时不会触发 `change:x` 事件.
- options.override: 默认为 `false`. 当 value 为一个复杂对象, 默认会递归 merge. 为 `true` 时, 强制覆盖原值, 不进行 merge.

```js
obj.set('attr1', {
    'name': 'arale',
    'version': '1.0'
});

obj.set('attr1', {
    'family': 'alipay'
}, {
    override: true
});
```

2) `obj.get(key)` 获取某个属性的值.

在实例化时, 会:

- 根据传入的配置属性, 自动设置各属性, 且不会触发 `change:x` 事件
- 自动注册类的 `_onChangeX` 方法到 `change:x` 事件的回调队列中

**这些操作对于使用者来说, 是透明的, 所以你不用关心去初始化属性.**

<a name="base-life-circle"></a>
### 生命周期

![base](https://f.cloud.github.com/assets/36899/1190289/91c70396-2431-11e3-9abe-700f3d8780bd.png)


<a name="base-usage"></a>
### 使用场景

> 哪些情况下使用 Base? 

满足以下条件的两个即可使用 Base: 

- 具有比较多的属性
- 需要事件支持
- 需要 Aspect

> 哪些不需要?

- 组件功能上比较单一, 比较独立, 比如 `Cookie`, `Position`
- 暴露的接口也不多
- 需要外部提供的东西也不多

建议你直接使用 `Class.create` 创建类, 再 Implements 你需要的 `Attribute`, `Events`, `Aspect`. 
或者, 更加简单的功能, 直接 `function` 定义就好. 

> 其他一些使用建议

- 尽可能统一管理变量, 作为 `attrs` 中的 attribute, 而不是 property
- 推荐使用 `_onChangeX`, 不需要用户手工绑定 `change:x` 事件


<a name="base-example"></a>
### 推荐范例

```js
var MyClass = Base.extend({
    attrs: {
        element: $('input#name'),
        name: {
            value: '',
            setter: function(val) {
                return val || ''
            },
            getter: function(val) {
                return val + ''
            }
        }
    },
    propsInAttrs: ['element'],
    initialize: function(options) {
        MyClass.superclass.initialize.call(this, options); 
        
        var that = this;
        
        this._async = function() {
            that.set('name', that.element.val(), {
                silent: true
            });
        };
        
        this.element.on('change', this._async);
    },
    say: function() {
        alert(this.get('name'));
    },
    destroy: function() {
        this.element.off('change', this._async);
        
        MyClass.superclass.destroy.call(this);
    },        
    
    _onChangeName: function(val) {
        this.element.val(val);
    }
});

// use MyClass like:
my = new MyClass();

my.before('say', function() {
    if (!this.get('name')) return false; 
});

my.set('name', 'arale');

setTimeout(function() {
    my.element.val('change name with aralejs');
    my.element.change();
    my.say();
    
    
    my.element.val('');
    my.element.change();
    my.say();
    
    my.destroy();
}, 3000);

// see: http://jsfiddle.net/lizziesky/dFF6H/
```

<a name="widget"></a>
## Widget 

<a name="widget-what"></a>
### 是什么

> Widget 是 UI 组件的基础类, 约定了组件的基本生命周期.
> 继承自 Base, 拥有 Base 的一切功能外, 还提供了其他一些通用功能.
> Widget 组件具有四个要素: 描述状态的 attribute 和 property, 描述行为的 event 和 method.

<a name="widget-life-circle"></a>
### 生命周期

Widget 有一套完整的生命周期, 控制着组件从创建, 到正式渲染, 再到销毁的整个过程.

整个过程如下图所示:

![widget](https://f.cloud.github.com/assets/36899/1190290/99ddf1c0-2431-11e3-975f-abf76c593e5d.png)


<a name="widget-init"></a>
### 初始化

<a name="widget-init-cid"></a>
#### this.cid

该值为组件实例在当前页面上的唯一标识. 在之后的渲染, 赋值在 `this.element` 的 `data-widget-cid` 属性上.

<a name="widget-init-parent"></a>
#### 父类初始化 

在解析 data-api 之后, 执行父类 Base 的 attribute 的初始化, 包含设置属性和绑定属性事件.

<a name="widget-init-element"></a>
#### this.element

一个正常的 UI 组件在 DOM 中一定有个根 DIV, 这就是 this.element. 

它可以是已有的 DOM 元素, 也可以是根据 template 创建的一个新 DOM 元素.

```js
// 1) 使用已有 DOM 元素
var o1 = new Widget({
    element: '#b'
});

console.log(o1.element);

// 2) 从 template 中创建
var o2 = new Widget({
    template: '<div style="width: 100px;color: red;">目标元素1</div>',
    parentNode: '#c'
});

console.log(o2.element);

// see: http://jsfiddle.net/lizziesky/C2aHf/
```

在 Widget 初始化结束后, this.element 已经存在, 但未必在 DOM 树中. 
不存在 DOM 中的 this.element 只有在调用 `this.render()` 后才真正插入到文档流. 默认插入到 `document.body`, 可以通过 `parentNode` 指定.

<a name="widget-init-props"></a>
#### this.initProps()

负责 properties 的初始化, 提供给子类覆盖.

```js
var MyWidget = Widget.extend({
    attrs: {
        width: 100,
        height: 200
    },
    initProps: function() {
        this.length = this.get('width') * this.get('height');
    }
});
```

<a name="widget-init-events"></a>
#### this.events

如果你设置了 `this.events`, 那么会在初始化时默认绑定这些事件.

```js
var MyWidget = Widget.extend({
    attrs: {
        inputClass: 'ui-input',
        itemClass: 'ui-form-item'
    },
    events: {
        'mouseenter .{{attrs.inputClass}}': 'mouseenter',
        'mouseleave .{{attrs.inputClass}}': 'mouseleave',
        'focus .{{attrs.itemClass}} input,textarea,select': 'focus',
        'blur .{{attrs.itemClass}} input,textarea,select': 'blur'
    }
});
```

<a name="widget-init-setup"></a>
#### this.setup()

专为子类提供的初始化接口, 可以直接覆盖定义.

```js
var MyWidget = Widget.extend({
    attrs: {
        inputClass: 'ui-input',
        itemClass: 'ui-form-item'
    },
    events: {
        'mouseenter .{{attrs.inputClass}}': 'mouseenter',
        'mouseleave .{{attrs.inputClass}}': 'mouseleave',
        'focus .{{attrs.itemClass}} input,textarea,select': 'focus',
        'blur .{{attrs.itemClass}} input,textarea,select': 'blur'
    },
    
    setup: function() {
    	// todo: init sth
    }
});
```

<a name="widget-render"></a>
### this.render()

渲染的过程:

- 让 attrs 中属性的初始值生效, 其中, 默认空值( null 或 undefined )不触发 
- 绑定 `_onRenderXXX` 到 change:attr 事件上

```js
var MyWidget = Widget.extend({
    attrs: {
        class: 'ui-form-item'
    },
    
    _onRenderClass: function(val) {
        this.element.addClass(val);
    }
});

var my = new MyWidget({
    element: '#b'
});
my.render();

// see: http://jsfiddle.net/lizziesky/nYPnJ/
```

<a name="widget-render-why"></a>
#### why?

```js
var sth = new SomeWidget();
sth.render();
```

为何 new 的时候不直接 render ? 非得调用一次 `render()`? 

render 这一步操作从初始化中独立出来, 是因为考虑到有些组件在初始化的时候并不想操作 DOM, 比如 `Dialog`. 
初始化只是准备, 只有当真正显示(渲染)时才需要插入到 DOM 中.

如果希望实例化的时候就渲染到页面上, 可在 `setup()` 里直接调用 `this.render()`.


<a name="widget-render-style"></a>
#### 样式隔离

为了避免同组件引入样式的冲突问题, 在 `this.render()` 时, 会给 `this.element` 包裹一个 DIV, 并给这个 DIV 添加形如 `famliy-name-version` 的样式类, 定义的 CSS 也会加此前缀. 这样就能避免样式冲突问题. **这步操作对开发者是透明的**

<a name="widget-render-cr"></a>
#### _onChangeX() 与 _onRenderX()

如果你的类都定义了 `_onChangeX` 与 `_onRenderX`, 当 `obj.set('x', 'a new value')` 之后, 触发 `change:x` 后都会执行这两个处理函数. 但两者的区别是:

- 绑定时机不同: `_onChangeX` 是实例初始化后绑定的, `_onRenderX`是在实例 render 之后才绑定的
- 用途也稍有不同: `_onRenderX` 是对 x 改变后触发 UI 的变化, 而 `_onChangeX` 范围更广些.

```js
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


// see: http://jsfiddle.net/lizziesky/WpCQx/
```

<a name="widget-destroy"></a>
### this.destroy()

Widget 默认绑定了 window 的 `unload` 事件, 当页面 unload 时, 触发当前页面上所有 Widget 实例的 `destroy()`.

实例的销毁过程, 如上图.

<a name="widget-others"></a>
### 其他方法

<a name="widget-others-selector"></a>
#### this.$(selector)

在 Widget 根元素 this.element 下查找符合选择器的元素

<a name="widget-others-delegate"></a>
#### this.delegateEvents()

前文提到的在初始化过程中, 可以通过 this.events 在初始化时绑定事件. 
在初始化之后, 可以通过 `this.delegateEvents()` 代理事件. 事件默认绑定在 `this.element` 上.  

```js
var myWidget = new Widget();

// 1) 事件代理在 `element` 上
myWidget.delegateEvents({
  'click p': 'fn1',
  'click li': function() {}
})

// 2) 事件代理在 `element` 上
myWidget.delegateEvents('click p', fn1)
myWidget.delegateEvents('click p', function() {})

// 3) 代理在 `element` 以外的 DOM 上
myWidget.delegateEvents('#trigger', 'click p', fn1)
// 等价于 `$('#trigger').on('click', 'p', fn1)`
myWidget.delegateEvents($('#trigger'), 'click', function() {})

// 4) 删除事件代理
myWidget.undelegateEvents(); 
myWidget.undelegateEvents(events); 
myWidget.undelegateEvents(element, events); 
```

提供此 API, 是为了统一管理组件的所有事件. 这在销毁组件时, 可以方便地解绑所有事件以防止内存泄露.
强烈推荐使用此 API 来绑定元素事件.

<a name="widget-other-query"></a>
#### Widget.query()

```js
var dlg = Widget.query('selector')
```

用于查找对应 selector 的 DOM 节点关联起来的 Widget 对象.


<a name="widget-other-auto"></a>
#### Widget.autoRenderAll() 与 Widget.autoRender()

通过 data-api 的形式, 自动实例化页面上所有 Widget 对象.

- data-widget: 指明哪个组件
- data-widget-role: 将当前的 DOM 作为 role 的属性去实例化, 默认的 role 为 element, 某些组件中 `data-widget-role` 可以设置为其他值, 参考 [Dialog 的 demo](http://aralejs.org/dialog/examples/auto-render.html).
- data-api: 值为 `off` 时, 不进行实例化. 当 `document.body` 上有设置 `data-api="off"` 时, 将不会实例化页面上所有的 Widget 组件


```js
// see: http://aralejs.org/switchable/examples/autorender.html
```

<a name="widget-usage"></a>
### 使用场景

> 如何选择使用 Base 还是 Widget?

- 和 UI 紧密相关, 需要创建, 修改, 删除 DOM 节点的, 使用 Widget
- 衡量下如果仅使用 Base 就够了, 那就不要使用 Widget


<a name="widget-example"></a>
### 推荐范例


```js
var MyWidget = Widget.extend({
    attrs: {
        name: ''
    },
    setup: function() {
        this.delegateEvents('click', this.say);
        
        this.render();
        
        this.before('show', function() {
            if (!this.get('name')) return false;
        });
        this.before('say', function() {
            if (!this.get('name')) return false;
        });
    },
    show: function() {
        this.element.show();
    },
    hide: function() {
        this.element.hide();
    },
    say: function() {
        alert(this.get('name'));
    },
    
    _onRenderName: function() {
        this.element.html(this.get('name'));
    }
});

var my = new MyWidget({
    template: '<div class="name-title" style="display: none;"></div>'
});
my.show();

setTimeout(function() {
    my.set('name', 'hi, arale');
    my.show();
}, 5000);

// see: http://jsfiddle.net/lizziesky/86yZU/1/
```