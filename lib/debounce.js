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