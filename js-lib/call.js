// call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。

Function.prototype.myCall = function(context, ...args) {
    context = context || window;
    args = args ? args : [];
    const key = Symbol();
    context[key] = this;
    const result = context[key](...args);
    delete context[key];
    return result;
}