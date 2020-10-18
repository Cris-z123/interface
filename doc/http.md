## HTTP请求状态码
## 响应状态码
1xx:
连接状态中
2xx:
请求成功
3xx:
重定向，需要继续操作
301-临时重定向
3.2-永久重定向
4xx:
客户端错误
400-bad require
404-not found
405-请求方式错误
5xx:
服务端错误
500-服务错误
## 请求状态吗




## 浏览器缓存
ETag: MD5  //有请求 //状态码304
XExpire: 日期  //在某个时间点过期,但是这个时间是本地时间，用户可以修改
Cache-Control: max-age=600    //在多少秒后过期  //无请求


## GET与POST的区别
1. POST安全 GET不安全
2. GET URL有长度限制 POST没有
3. GET 参数放在URL POST是放在消息体里的
4. GET 只需要一个报文 POST需要两个报文
5. GET 幂等 POST 不幂等

GET与POST本质是相同的，仅是语义化不同，但我们仍要按照标准来使用


## Cookie、LocalStorage和sessionStorage的区别
1. Cookie 就是服务器发给浏览器的一段字符串,保存在浏览器上在每次访问服务器的时候，都需要带着它
2. Session 是一段时间内的会话,Session是在服务器上的
3. Session一般是基于Cookie来实现，是将Session-id放到Cookie里
4. Cookie较小，一般是4k左右，LocalStorage一般比较大，5MB左右
5. Cookie会被发送到服务器上，LocalStorage只保存在浏览器上
6. LocalStorage会在浏览器上持久化保存的，只能手动关闭。SessionStorage会在页面关闭后消失

## http1.0 1.1 2.0
1.0 
1.1 持久化连接
2.0 多路复用 服务端推送 默认开启https