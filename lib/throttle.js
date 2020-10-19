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