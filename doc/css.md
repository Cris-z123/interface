## 盒模型
在 CSS 中，我们有几种类型的盒子，一般分为区块盒子（block boxes）和行内盒子（inline boxes）。

CSS 中组成一个区块盒子需要：
* 内容：显示内容的区域；使用 inline-size 和 block-size 或 width 和 height 等属性确定其大小。
* 内边距：填充位于内容周围的空白处；使用 padding 和相关属性确定其大小。
* 边框：边框盒子包住内容和任何填充；使用 border 和相关属性确定其大小。
* 外边距：外边距是最外层，其包裹内容、内边距和边框，作为该盒子与其他元素之间的空白；使用 margin 和相关属性确定其大小。
## 垂直居中

## Flex
* `justify-content`
* `align-item`
* `align-content`
* `flex-direction`
* `flex-grow`


## BFC
块级格式化上下文
如果我们给一个div写一个 `overflow: hidden` 那么这个div中的浮动元素就会被他包裹起来

## CSS选择器
越具体优先级越高
写在后面的覆盖前面的
important! 最高


## 清除浮动
```css
.clear-fix {
    clear: both;
}
```

```css
.clear-fix {
    overflow: hidden;
    zoom: 1;
}
```

```css
.clear-fix:after {
    content: '';
    display: block;
    clear: both;
}
```
