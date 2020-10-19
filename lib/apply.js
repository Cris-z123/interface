Function.prototype.myApply = function(context, args) {
    context = context || window;
    args = args ? args : [];
    const key = Symbol();
    context[key] = this;
    const result = context[key](...args);
    delete context[key];
    return result;
}