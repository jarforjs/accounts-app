Arale 2.0 的整体内容包括四部分：

1. **Infrastructure（基础架构）。**包括 seajs, events, class, base 和 widget 模块。这是整个类库的基础，能从底层让代码的书写规范、组件的构建方式、模块的调用方式等保持整体一致性。
1. **Utilities（工具组件）。**包括 jquery, zepto, position, storage 等等。工具组件的特点是，它们是锤子、斧头，其他组件只是通过纯组合的方式使用它们。工具组件里，大部分将直接来自社区已有的成熟组件。
1. **Widgets（UI 类组件）。**包括 overlay, switchable, tree 等等。目前 jQuery 社区和 CommonJS 等社区尚未有很好用很成熟的 UI 解决方案，因此 UI 类组件大部分将自主研发。这将会是 Arale 类库的核心亮点之一。
1. **Developer Tools（开发者工具）。**这一块很重要，包括 spm, gjslint, docs-build 等工具。只有通过工具，与整个前端平台打通，才能实现前端的体系化。


## 基础架构图

![arale infrastructure](https://raw.github.com/DerekNing/arale/master/docs/assets/arale-infrastructure.png)

无箭头的连接线表示组合关系，有箭头的表示继承。


## Module System

模块系统（Module System）约定了所有模块必须遵循的基本规范。在 Arale 中，一个文件就是一个模块，写法遵循 SeaJS 的统一约定：

```js
/* some-file.js */
define(function(require, exports, module) {
    var $ = require('jquery'); // 通过 require 引入外部模块
    exports.doSomething = function() {  // 通过 exports 向外提供接口
    };
    // 也可以通过 module.exports 向外提供接口
    module.exports = XX;
});
```

上面是模块系统的基本约定，更多细节，请参考 SeaJS 的文档：

- <http://seajs.org/>


## Base 和 Widget

Base 基类默认提供了 Class、Events 和 Options 支持。Widget 则是所有 UI 组件的基类，为 UI 组件提供了数据解析等工具集以及生命周期管理。细节请参考：

- [Base 使用文档](http://aralejs.org/base/)
- [Widget 使用文档](http://aralejs.org/widget/)


## Utilities

工具组件（Utilities）是向外提供组合式使用功能的模块。对于大部分工具类，都是简单的 object 对象，直接使用模块系统就可以很方便的构建。比如 Cookie 组件：

```js
/* cookie.js */
define(function(require, exports) {
    var Cookie = exports;
    
    Cookie.get = function() { ... };
    Cookie.set = function() { ... };
    Cookie.remove = function() { ... };
});
```

如果某个工具组件需要实例化后使用，并且需要 Events, Attrs, Options 等特性，则可以继承自 Base:

```js
/* DataLazyload.js */
define(function(require, exports, module) {
    var Base = require('base');

    var DataLazyload = Base.extend({
        options: { ... },
        attrs: { ... },
        initialize: ...,
        load: ...
    });

    module.exports = DataLazyload;
});
```

工具组件之间可以互相调用，但需要尽量减少耦合性。在 Arale 2.0 里，**不追求代码的零重复，更追求组件的独立性**。组件 A 和组件 B 的内部有少量重复代码是允许的。比如 jQuery 里有 `each` 等方法，和 Underscore 的部分方法有重复代码，这没关系，职责单一、彼此独立更重要。


## Widgets

在 Arale 2.0 里，所有自主研发的 UI 类组件都将继承自 `Widget` 基类。实现 UI 类组件时，除了 Events, Attrs 和 Options 是采用混入（mix-in）的方式，其他外部组件提供的功能，都将采用组合的方式来调用。我们提倡：**优先使用组合，其次是混入，最后才是继承。** 比如：

```js
/* overlay.js */
define(function(require, exports, module) {
    var Widget = require('widget');
    var Position = require('position');

    var Overlay = Widget.extend({
        options: { ... },
        attrs: { ... },
        initialize: ...,
        center: function() {
            Position.center(this.srcNode); // 纯组合使用关系
        }
    });

    module.exports = Overlay;
});
```

这样看起来很傻，写法上不如 YUI3 等类库的混入方式简洁。但好处也非常明显：

1. 去除了晦涩的约定。用 mix-in 的方式，需要提前约定好 `this._posNode` 等属性，初期看起来简单，长远来看不利于维护。
1. 使用更灵活。使用纯组合的方式，想怎么用就怎么用。
1. 职责更单一，独立性更强。Position 不需要知道 Widget 的存在，Widget 也可以换用其他类似工具组件来实现。


## 更多

这里只简单说明了 Arale 2.0 的基础架构部分，更多细节，请关注各个组件的实现。


## 相关讨论

 - [前端研发模式的思考](https://github.com/aralejs/aralejs.org/issues/50)