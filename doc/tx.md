1. vue源码，发布订阅原理
Observer递归遍历Vue实例中传入的所有data选项将它们变成Object.defineProperty的getter、setter，这时就可以监听到数据的变化；
Compile解析模板，将模板中的变量用对应的数据，然后初始化视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据变化，收到通知更新视图；
Watcher用来做数据和模板之前的桥梁，它会收集所有的（dep），它还有一个update的方法，当数据变化通知时，触发update方法，触发Compile触发相应的回调；
vm是入口，整合了Observer、Complier、Watcher三者，Observer用来监听数据变化、Complier用来解析编译模板、Watcher是Observer和Complier的通信桥梁。
2. 深浅拷贝
3. 输入url到页面展示的过程
4. 浏览器缓存，以及应用场景
协商缓存：Header: Last-Modified（服务端最后修改时间） If-Modified-Since（上一次请求返回的Last-Modified）
ETag（服务端根据当前请求资源生成的唯一标识） If-None-Match（上一次请求返回的ETag）
没有命中强缓存，就会向服务端发一个请求，验证协商缓存是否命中，如果命中就会返回状态码304以及字符串Not Modified，命中后从客户端缓存中加载

强缓存：Response Header: Expires and Cache-control
命中强缓存时，返回状态码200（开发者工具network的size会显示from cache），不会发请求到服务端
主要对静态资源进行缓存，动态资源慎用，否则将不能加载最新的资源
5. 节流和防抖，以及应用场景
6. 跨域
7. 排序算法