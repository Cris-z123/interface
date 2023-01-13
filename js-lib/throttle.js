/**
 * 手写节流：一定时间内函数只能执行一次
 * 
 * 方法一：
 * 1.定义计数器
 * 2.如果没有计数器，就定义一个计数器，绑定函数上下文
 * 3.清除计数器
 * 
 * 方法二：
 * 1.定义上次触发时间
 * 2.比较两次调用时间差
 * @param {*} fn 
 * @param {*} delay 
 */
function throttle(fn, delay) {
    let timer = null;
    return function() {
        let args = arguments;
        let context = this;
        if(!timer) {
            timer = setTimeout(()=> {
                fn.apply(context, args)
                clearTimeout(timer)
                timer = null;
            }, delay)
        }
    }
};

throttle = (fn, delay) => {
    let last = 0;
    return (...args) => {
        const now = + Date.now();
        if(now > last + delay) {
            last = now;
            fn.apply(this, args)
        }
    }
};

function throttle(fn, delay){
    let canUse = true
    return function(){
        if(canUse){
            fn.apply(this, arguments)
            canUse = false
            setTimeout(()=>canUse = true, delay)
        }
    }
};
