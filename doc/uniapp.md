### 基本原理
1. 基本语言包括js、vue、css。以及ts、scss等css预编译器。

2. 根据不同环境各自编译

3. 根据不同环境有各自的`runtime`

4. 逻辑层和渲染层分离

### 生命周期
应用生命周期, 仅可在App.vue中监听，在其它页面监听无效
```js
// 当uni-app 初始化完成时触发（全局只触发一次）
onLaunch
// 当 uni-app 启动，或从后台进入前台显示
onShow
// 当 uni-app 从前台进入后台
onHide
// 	当 uni-app 报错时触发
onError
```

页面生命周期
```js
// 监听页面加载，该钩子被调用时，响应式数据、计算属性、方法、侦听器、props、slots 已设置完成，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参）
onLoad
// 监听页面显示，页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
onShow
// 监听页面初次渲染完成，此时组件已挂载完成，DOM 树($el)已可用，注意如果渲染速度快，会在页面进入动画完成前触发
onReady
// 监听页面隐藏
onHide
// 监听页面卸载
onUnload
// 监听用户下拉动作，一般用于下拉刷新
onPullDownRefresh
// 页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据
onReachBottom
```
### 常用组件
```html
<!-- 基础容器 -->
<view></view>

<!-- 滚动容器 -->
<scroll-view></scroll-view>

<!-- 滑动容器 -->
<swiper></swiper>

<!-- 文本容器 -->
<text></text>

<!-- 图片元素 -->
<image></image>

<!-- 视频元素 -->
<video></video>

<!-- 音频元素 -->
<audio></audio>

<!-- 输入框 -->
<input></input>

<!-- 按钮 -->
<button></button>

<!-- 表单 -->
<form></form>

<!-- 开关元素 -->
<switch></switch>

<!-- 文本域 -->
<textarea></textarea>

<!-- 选择组件 -->
<picker-view></picker-view>
```

### 路由跳转
```js
/**
 * OBJECT
 * @param {String} url 页面路径
 * @param {String} animationType 动画
 * @param {Number} animationDuration 动画时间
 * @param {Object} events 页面间通信接口
 * @param {Function} success 成功回调
 * @param {Function} fail 失败回调
 * @param {Function} complete 结束时的回调
 */
uni.navigateTo(OBJECT) // 保留当前页面，跳转指定页面 
uni.redirectTo(OBJECT) // 关闭当前页面，跳转指定页面
uni.reLaunch(OBJECT) // 关闭所有页面，跳转指定页面
uni.switchTab(OBJECT) // 跳转到tabBar页面，并关闭其他所有非tabBar页面
uni.navigateBack(OBJECT) // 关闭当前页面，返回上一页面或多级页面
uni.preloadPage(OBJECT) // 预加载页面
```

### 注意事项
1. 除了H5环境，没有BOM和DOM，如果要使用相关API，需通过`renderjs`实现
2. 要使用新的HTML标签，没有采用标准HTML标签
3. 使用flex布局，rpx为默认单位
4. 页面放到`pages`目录，自定义组件放到`component`目录，静态资源放到`static`目录


### 移动端预览文件

### 富文本编辑器
