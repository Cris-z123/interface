## <<前端开发核心知识进阶>>

### 第一章 js 基础强化

#### `this`

1. `this` 指向
   - 函数体内，非显示或隐式简单调用时，`use strict`为 undefined;非严格模式指向全局对象`global / window`
   - 一般 new 创建的构造函数，指向新创建的对象
   - `call/bind/apply` 显式调用时，指向指定参数
   - 上下文对象调用时，指向该对象
   - 箭头函数中，指向由外层（函数或全局）作用域决定
2. bind call apply
   它们都是用来改变函数的 this 指向的，但是 call 和 apply 是直接进行函数调用的，bind 则是返回一个新的函数，并绑定了新的 this 指向
   ```js
   const target = {};
   fn.call(target, "arg1", "arg2");
   fn.apply(target, ["arg1", "arg2"]);
   fn.bind(target, "arg1", "arg2")();
   ```

#### 闭包

js 代码执行的两个阶段：

- 代码预编译阶段
  - 进行变量声明
  - 对声明变量进行提升，但是值为 undefined
  - 对所有非表达式的函数声明进行提升
- 代码执行阶段

1. 定义
   函数嵌套函数时，内层函数引用了外层函数作用域下的变量，并且内层函数在全局环境下可访问，进而形成闭包。

#### 数据类型及其转换

1. 数据类型
   `Undefined` `Null` `Number` `String` `Boolean` `Symbol` `Bigint`
   `Object`(Function Array Date)
2. 类型转换
   使用+操作时，复杂数据类型会调用`valueOf`或`toString`获得返回值，再按照简单数据类型的规则转化
   具体调用 `valueOf` 还是 `toString`，由 ES 规范规定。具体取决于内置的 toPrimitive 的调用结果

### 第二章 js 进阶

#### 异步操作

1. `Promise`
   - `Promise` 对象用于表示一个异步操作的最终完成（或失败）及其结果值
   - `async` `await` 就是 `Generator` 的语法糖，能够自动执行生成器函数，且更加方便的实现异步流程。本质上还是要更加深刻理解 `Promise`
2. JS 的任务
   - 同步任务：主线程将要执行的任务，这些任务会形成执行栈（execution context stack）
   - 异步任务：进行任务队列（task queue），当主线程空闲时，再执行任务队列中的任务
3. 任务队列又分为 宏任务（macro task）和微任务（micro task）

   主线程空闲时，先执行微任务队列，处理完微任务后，再处理宏任务

   macro task:

   - setTimeOut
   - setInterval
   - I/O
   - 事件
   - postMessage
   - setImmediate （node.js）
   - requestAnimationFrame
   - UI 渲染

   micro task:

   - Promise.then
   - MutationObserver
   - process.nextTick （node.js）

#### Promise

1. Promise/A+规范的基本内容
   `Promise` 构造函数返回一个 `Promise` 对象实例，这个对象具有一个 `then` 方法，在 `then` 方法中，调用者可以定义两个参数，分别是 `onfulfilled` 和 `onrejected`，它们都是函数类型的参数。`onfulfilled` 通过参数可以获取 `Promise` 对象经过 `resolved` 处理后的值，`onrejected` 可以获取 `Promise` 对象经过 `reject` 处理后的值。通过这个值，我们来处理异步操作完成后的逻辑。

#### 面向对象和原型

1. new 关键字
   1. 创建一个空对象，这个对象将会成为执行构造函数之后返回的对象实例
   2. 让创建的空对象的原型指向构造函数的 prototype 属性
   3. 将这个空对象赋值给构造函数内部的 this，并执行构造函数逻辑
   4. 根据构造函数执行逻辑，返回第一步创建的对象或构造函数的显式返回值

### 第三章 HTML 与 CSS

#### HTML

1.  HTML 的语义化
    - Microformats: 语义化的发展与高级玩法，通过拓展 HTML 元素或属性，增强 HTML 的语义表达能力

#### CSS

1. BFC：块级格式化上下文
   它会创建一个特殊的区域，在这区域中，只有 block box（`display` 属性为 `block`，`list-item`，`table`的元素） 参与布局；而 BFC 的一系列特点和规则
   规定了在这个特殊的区域中如何进行布局，如何进行定位，区域内元素的相互关系和相互作用是怎样的。这个特殊的区域不受外界影响。
2. 如何形成 BFC
   - 根元素过其他包含根元素的元素
   - 浮动元素
   - 绝对定位元素
   - 内联块
   - 表格单元格
   - 表格标题
   - 具有 overflow 且值不为 visible 的块元素
   - display: flow-root; 的元素
   - columns-span: all; 的元素
3. BFC 的规则
   - 内部的 box 会独占宽度，且在垂直方向上一个接一个排列
   - box 在垂直方向上的间距由 margin 属性决定，但是同一个 BFC 的两个相邻 box 的 margin 会出现边距折叠现象
   - 每个 box 在水平方向上的左边缘与 BFC 的左边缘相对齐，即使存在浮动也是如此
   - BFC 区域不会与浮动元素重叠，而是会依次排列
   - BFC 区域是一个独立的渲染容器，容器内的元素和 BFC 区域外的元素之间不会由任何干扰
   - 浮动元素的高度也参与 BFC 的高度计算
