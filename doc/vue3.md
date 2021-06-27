### Vue2.x 与 Vue3.x 的关键区别

1. `ref`
   用来定义一个响应式的数据，主要是简单数据类型
   也具有 vue2 中 ref 的作用，获得节点
   ```js
   const num = ref(1);
   console.log(num.value); // 1
   ```
2. `reactive`
   用来定义一个响应式的数据，主要是复杂数据类型
   也具有 vue2 中 ref 的作用，获得节点
   与 vue2.x 中的 data 类似，但改变了使用方法

   ```js
   const obj = reactive({ name: "a" });
   console.log(obj.name); // a
   ```

3. `setup`
   Composition Api 的入口函数，只在初始化时执行一次，在 onBeforeCreate 之前执行。
   参数：`props`，`context`
   最新语法糖提案：`<script setup></script>`，可以不写 setup()，也不需要 `export default`，属性和方法也不用返回。
   import 组件后，可以直接在 template 中直接使用,不需要再去注册组件。
   但是 props, emit, attrs 需要用新的 api 去获取：
   - defineProps：接受父组件的传来的 props
   - defineEmit：声明触发的事件表
   - useContext：获取上下文 context
4. `toRefs`
   将响应式对象转化为普通对象，该对象的每个属性都是一个`ref`
   可以实现 reactive 中对象的解构
5. 生命周期
   vue3: beforeCreate -> created -> onBeforeMount -> onMounted -> onBeforeUpdate -> onUpdated -> onBeforeUnmount -> onUnmounted
   vue2: beforeCreate -> created -> onBeforeMount -> onMounted -> onBeforeUpdate -> onUpdated -> onBeforeDestroy -> onDestroyed
6. 异步组件
   `defineAsyncComponent(() => import('./xxx.vue'))`
