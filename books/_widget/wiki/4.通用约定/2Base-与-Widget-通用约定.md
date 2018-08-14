# Base 与 Widget 通用约定


## 实例成员的类型

在 Arale 中，如果一个对象 object 是 Base 的实例，则该对象上含有以下几种类型成员（members）：

1. `this.attrs` - 与实例状态相关的属性，比如 `width`、`height`、`title` 等。`attrs` 属性通过 `this.get('width')` 来获取，通过 `this.set('width', 200)` 来设置。设置属性值后，会自动触发 `change:attrName` 事件。对于设计良好的组件来说，属性在改变后，会实时反映到实例状态上。

2. `properties` - 直接添加在实例上的变量，比如 `this.element` 等。一个实例上拥有哪些 `properties`，由组件设计者决定。建议越少越好，如无必要，不要暴露给普通用户。

3. `methods` - 直接添加在实例上的方法，比如 `this.show()` 等。

对于 `properties` 和 `methods`，如果命名以下划线开头，表示是私有变量，仅供内部使用。


## 构造器参数

在 Arale 中，基于 Base 的类在实例化时，推荐遵循统一的参数命名和含义约定：

```js
var SomeClass = Base.extend({...});
var object = new SomeClass(config);
```

实例化时传入的参数叫 `config`，表示用户传入的配置信息。`config` 里绝大部分是 `attrs` 的配置，也有部分表示事件注册，比如

```js
var object = new SomeClass({
    onShow: fn,        // 等价 object.on('show', fn)
    afterShow: fn,     // 等价 object.after('show', fn)
    beforeHide: fn,    // 等价 object.before('hide', fn)
    onChangeTitle: fn  // 等价 object.on('change:title', fn)
});
```


## 成员的命名与访问性约定

1. 能 private 的还是尽量 private. 方式是将方法静态化，需要 this 上的属性时，作为参数传入。
1. 如果属性和方法不好 private 化，则用下划线开头开表示 private 性质。
1. 其他的都是 public api。


## classPrefix 的约定

[[UI-组件自定义样式]]
