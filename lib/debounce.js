/**
 * 手写防抖函数
 * 1.判断定时器是否存在，清除计数器
 * 2.重新调用setTimeout
 * @param {*} fn 
 * @param {*} delay 
 */

function debounce(fn, delay) {
    let timer;
    return function() {
        let context = this;
        let args = arguments;
        timer && clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(context, args)
        }, delay)
    };
};