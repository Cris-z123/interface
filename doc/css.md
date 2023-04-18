## 盒模型

## 垂直居中

## Flex
* justify-content
* align-item
* align-content
* flex-direction
* flex-grow


## BFC
块级格式化上下文
如果我们给一个div写一个overflow: hidden 那么这个div中的浮动元素就会被他包裹起来

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
