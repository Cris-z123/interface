## ES6语法

## Promise
  1. Status: `pending` `fulfilled` `rejected`
  2. api:
       * `Promise.prototype.then()`
       * `Promise.prototype.catch()`
       * `Promise.prototype.finally()`
       * `Promise.all()`
       * `Promise.race()`
       * `Promise.allSettled()`
       * `Promise.any()`
       * `Promise.resolve()`
       * `Promise.reject()`

## 防抖、节流
防抖，就是一个按钮连续点击后，只执行最后一次
```js
function debounce(fn, delay) {
    let timer;
    return function() {
        let context = this;
        let args = arguments;
        timer && clearTimeout(function() {
            fn.apply(context, args)
        }, delay*100)
    }
}
```
节流，就是一个按钮点击执行后，后续的点击事件需要等待一段时间才执行。
```js
function throttle(fn, delay) {
    let timer = null;
    return function() {
        let args = arguments;
        if(!timer) {
            timer = setTimeout(()=> {
                fn.apply(context,args)
                clearTimeout(timer)
                timer = null;
            }, delay*100)
        }
    }
}
```
## this

## 闭包

## 跨域

1. CORS
   * `Access-Control-Allow-Origin`: 可接受的域名（*为所有）
   * `Access-Control-Allow-Credentials`: `Boolean` 表示是否可以发送cookie
   * `Access-Control-Expose-Headers`: `XHMHttpRequest`对象的方法只能够拿到六种字段: `Cache-Control`、`Content-Language`、`Content-Type`、`Expires`、`Last-Modified`、`Pragma` ,如果想拿到其他的需要使用该字段指定。
   * `Access-Control-Request-Method`: 使用的http请求方法
   * `Access-Control-Request-Headers`: 浏览器发送的自定义字段
   
   简单请求: 使用`HEAD` `GET` `POST` 且请求头不超过`Accept` `Accept-Language` `Content-Language` `Last-Event-ID` `Content-Type`
   非简单请求: 除了简单请求的时候非简单请求，需要发送预检请求 预检的请求方法是`OPTIONS`
   
## ajax
```js
const request = new XMLHttpRequest()

request.open('GET', '/xxxx')
request.onreadyStatechange = function() {
    if(request.readyState === 4) {
        console.log('请求完成')
        if(request.response.status >= 200 && request.response.status < 300) {
            console.log('请求成功')
        }else {

        }
    }
}
request.send()
```
