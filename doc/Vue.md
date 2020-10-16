## watch 和 computed区别
1. watch是监听数据 computed是计算属性
2. watch是没有缓存的，只要每次监听的值变化时它都会执行回调；computed是有缓存的，只有它依赖的属性值的变化时，才会变化

## Vue有哪些生命周期钩子
beforeCreate //创建组件时做一些事情
created //创建组建后做一些事情
beforeMount //挂载组件前做一些事情
Mounted //挂载组件后做一些事情
beforeUpdate //组件更新前做一些事情
updated //组件更新时做一些事情
beforeDestroy //组件销毁前做一些事情
Destroy //组件销毁后做一些事情

## Vue如何实现组件件通信
1. 父子组件 $emit('xxx', data) $on('xxx', function(){}) props
2. 爷孙组件 eventBus
3. 兄弟组件 eventBus
4. Vuex
   
## Vuex
Vuex是一个专门为Vue.js应用程序开发的状态管理工具
* State
* Action
* Getter
* Mutation
* Module

## Vue的数据响应式是怎么实现的

## VueRouter
Vue Router 是 Vue.js 官方的路由管理器。
1. 懒加载
2. 重定向和别名
3. 路由守卫
4. History
5. 动态路由