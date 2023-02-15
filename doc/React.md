## 受控组件和非受控组件

## 组件通信

## 生命周期

## Hooks API

vue的hook思想来源于react
相同点：

基于函数的组合式 API 提供了与 React Hooks 同等级别的逻辑组合能力


vue hook目的：让你在函数组件里“钩入” value(2.x中的data) 及生命周期等特性的函数
react hook的目标：让你在不编写 class 的情况下使用 state 以及其他的 React 特性（生命周期）


都是在版本中出现


vue3.0版本出现hook
react16.8版本出现hook

不同点：


1. hook执行次数
组合式 API（vue hook） 的 setup() 函数只会被调用一次；react数据更改的时候，会导致重新render，重新render又会重新把hooks重新注册一次。


使用 Vue 组合式 API（vue hook） 的代码会是：

一般来说更符合惯用的 JavaScript 代码的直觉；
不需要顾虑调用顺序，也可以用在条件语句中；
不会在每次渲染时重复执行，以降低垃圾回收的压力；
不存在内联处理函数导致子组件永远更新的问题，也不需要 useCallback；
不存在忘记记录依赖的问题，也不需要“useEffect”和“useMemo”并传入依赖数组以捕获过时的变量。Vue 的自动依赖跟踪可以确保侦听器和计算值总是准确无误。



2. 实现原理不同
hook执行次数不同，是因为实现原理不同。
react hook底层是基于链表实现，调用的条件是每次组件被render的时候都会顺序执行所有的hooks；
vue hook是基于用proxy实现的数据响应机制，只要任何一个更改data的地方，相关的function或者template都会被重新计算，因此避开了react可能遇到的性能上的问题。


3. 学习成本
react hook的上手成本相对于vue会难一些，vue天生规避了一些react中比较难处理的地方


## 虚拟DOM

## DOM Diff

## Redux

## 类组件和函数组件
