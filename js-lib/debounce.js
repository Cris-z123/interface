/**
 * 手写防抖函数,防抖函数可以支持多次触发函数时，只对最后一次触发生效。
 * 
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

function debounce(fn, delay){
    let timerId = null
    return function(){
        const context = this
        if(timerId){window.clearTimeout(timerId)}
        timerId = setTimeout(()=>{
            fn.apply(context, arguments)
            timerId = null
        },delay)
    }
}