arale 的 UI 组件使用模版机制，代码有一套默认的模版，如果使用者想要修改模版样式我们提供了以下方案

> 方案来源于讨论 [#135](https://github.com/aralejs/aralejs.org/issues/135)

## 方案

采用更换前缀的方式来支持自定义样式，组件需要有一个约定的属性 `classPrefix` 来定义样式的前缀，此属性要由组件开发者添加。

组件

```javascript
var Overlay = Widget.extend({
  attrs: {
    classPrefix: 'ui-overlay'
  }
})
```

模版

```html
<div class="{{classPrefix}} {{classPrefix}}-focused">
  <div class="{{classPrefix}}-header"></div>
  <div class="{{classPrefix}}-content"></div>
  <div class="{{classPrefix}}-footer"></div>
</div>
```

样式

```css
.ui-overlay {}
.ui-overlay-header {}
.ui-overlay-content {}
.ui-overlay-footer {}
.ui-overlay-focused .ui-overlay-content {}
```

组件开发者需要注意的是：**每次渲染模版的时候 model 上都要有 classPrefix，尤其是重复渲染的时候**。

如果要使用自定义样式，在实例化时只需要指定 `classPrefix: 'ui-overlay2'`，将样式的前缀也改成 ui-overlay2。

```javascript
new Overlay({
  classPrefix: 'ui-overlay2'
})
```

```css
.ui-overlay2 {}
.ui-overlay2-header {}
.ui-overlay2-content {}
.ui-overlay2-footer {}
.ui-overlay2-focused .ui-overlay-content {}
```

如果不使用模版，使用者可直接传 DOM元素，这样就不用设置 `classPrefix`。

```html
<div id="overlay" class="ui-overlay3  ui-overlay3-focused">
  <div class="ui-overlay3-header"></div>
  <div class="ui-overlay3-content"></div>
  <div class="ui-overlay3-footer"></div>
</div>
```

```javascript
new Overlay({
  element: $('#overlay')
});
```

此方案跟样式的整体方案相关，支付宝的样式架构为一个样式池，所有的样式组件都对应一个唯一的 id，为了页面上不冲突允许代码适量冗余，所以 classPrefix 是对应这个 id 的。

好处：基于模板构建的组件，不同皮肤间可以做到彻底绝缘，彼此互不影响。

坏处：模板写起来比较麻烦，要注意传 `classPrefix`；无法复用任何已有皮肤的样式，必须全新写。

## 备选方案

备选方案采用在根节点增加一个样式的方式，而不修改模版的 class。

这种方式下，组件模版的样式是写死的，不需要额外的处理。如果要自定义样式，可指定 className 来覆盖原来的样式。

```html
<div class="ui-overlay ui-overlay-focused">
  <div class="ui-overlay-header"></div>
  <div class="ui-overlay-content"></div>
  <div class="ui-overlay-footer"></div>
</div>
```

```javascript
new Overlay({
  className: 'custom'
})
```

```css
.ui-overlay .ui-overlay-header {}
.ui-overlay .ui-overlay-content {}
.ui-overlay .ui-overlay-footer {}
.custom .ui-overlay-header {}
```

注意：

1. className 由 widget 提供，所以组件不用增加此参数。
2. 写 css 的时候要注意使用命名空间，防止命名冲突

好处：皮肤自定义，由用户决定，不想用默认皮肤时，不引入就好，直接用默认的 class 重写一套就好，如果要复用，则引入默认的皮肤，再写需要覆盖的部分就好。

坏处：如果一个页面有同一个组件的多套皮肤，容易引起冲突（因此在实现时，都可能走捷径采取了覆盖默认 class 的策略）。