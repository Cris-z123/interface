## ES6语法

## Promise

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
